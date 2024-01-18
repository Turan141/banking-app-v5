import { modPow } from "@/utils/bigint";

enum IParamsType{
    REGULAR="regular",
    CORPORATE="corporate"
}

interface IParamItem{
    g:string,
    N:string,
    k:string,

    n?:string
    b?:string,
    s?:string
}

type IParams={
    [key in IParamsType]:IParamItem
}

export class SRPClient{

   static params:IParams = {
        regular: {
            g: '5',
            N: 'ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e08' +
                '8a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b' +
                '302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9' +
                'a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe6' +
                '49286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8' +
                'fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d' +
                '670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c' +
                '180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf695581718' +
                '3995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d' +
                '04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7d' +
                'b3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d226' +
                '1ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200c' +
                'bbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfc' +
                'e0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b26' +
                '99c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db' +
                '04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2' +
                '233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127' +
                'd5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199' +
                'ffffffffffffffff',
            k: '3509477ea9fca66eadb7cf7b1bd0eb508f54d3989a9c988006a7d0b338374dd2'
        },
        corporate: {
            g: '2',
            N: 'eeaf0ab9adb38dd69c33f80afa8fc5e86072618775ff3c0b9ea2314c' +
                '9c256576d674df7496ea81d3383b4813d692c6e0e0d5d8e250b98be4' +
                '8e495c1d6089dad15dc7d7b46154d6b6ce8ef4ad69b15d4982559b29' +
                '7bcf1885c529f566660e57ec68edbc3c05726cc02fd4cbf4976eaa9a' +
                'fd5138fe8376435b9fc61d2fc0eb06e3',
            k: '1a1a4c140cde70ae360c1ec33a33155b1022df951732a476a862eb3ab8206a5c'
        }
    }


    private type?:"regular"|"corporate";
    private g:bigint=0n;
    private N:bigint=0n;
    private k:bigint=0n;
    private a:bigint=0n;
    private A?:string
    private salt?:string
    private B:bigint=0n
    private S?:string
    private K?:string
    private M1?:string

    private sessionId?:string
    private usernameHash?:string

    // sha256
    sha256(value:any,asBigInt?:Boolean):String|bigint{
        const result = CryptoJS.SHA256(value).toString(CryptoJS.enc.Utf8);
        return asBigInt?BigInt('0x'+result):result;
    }

    //random word
    random(length:number=16){
        return CryptoJS.lib.WordArray.random(length).toString(CryptoJS.enc.Utf8);
    }

    step1(username:string, type:IParamsType) {

        this.type = type;
    
        this.g = BigInt(SRPClient.params[type].g);
        this.N = BigInt('0x' +SRPClient.params[type].N)
        this.k = BigInt('0x' + SRPClient.params[type].k); // 16 ??
    
        this.a = BigInt('0x' + this.random());
    
        this.A = modPow(this.g, this.a, this.N).toString(16);
    
        this.sessionId = this.random();
        this.usernameHash = this.sha256(username) as string;
    
        return {
          sessionId: this.sessionId,
          usernameHash: this.usernameHash
        }
      }
    
      step1Response(data:IParamItem) {
        if (
          data.g !== this.g.toString() ||
          data.n !== this.N.toString(16) ||
          data.k !== this.k.toString(16)
        ) {
          throw "Secure field parameters do not match";
        }
    
        this.B = BigInt('0x' + data.b);
        this.salt = data.s;

        if (this.B % this.N === 0n)
            throw "Invalid B";
        
      }
    
      step2(password:string) {
        if(!this.salt)
            throw "No Salt"

        let str = this.salt;
    
        if (this.type == 'corporate') {
          let passwordHash = CryptoJS.SHA1(password).toString();
          str += this.sha256(passwordHash);
        } else {
          let passwordHash = CryptoJS.HmacSHA256(password, this.salt).toString();
          str += this.sha256(this.usernameHash + ':' + passwordHash);
          str = str.toUpperCase();
        }
        let x = this.sha256(str, true) as bigint;
    
        let u = this.sha256(this.A + this.B.toString(16), true) as bigint;
        let kgx = this.k * modPow(this.g, x, this.N);
        let S = modPow(this.B - kgx, this.a + u*x, this.N);
    
        this.S = S.toString(16)
    
        this.K = this.sha256(this.S) as string;
    
        this.M1 = this.sha256(this.A + this.B.toString(16) + this.S) as string;
    
        return {
          A: this.A,
          M1: this.M1,
          K: this.K
        }
      }
    
    
      step2Response(m2:string) {
        
        if(!this.A || this.M1)
            throw "Invalid A or M1"

        if (m2 !== this.sha256(this.A + this.M1 + this.S)) {
          throw "Invalid M2";
        }

      }
    
      crypt(message:string, k?:string) {
        if (!k)
            k = this.K;
        if(!k)
            return ""
        const key = CryptoJS.enc.Hex.parse(k);
        const iv = CryptoJS.lib.WordArray.random(128 / 8);
    
        const ct = CryptoJS.AES.encrypt(message, key, { iv });
    
        return {
            hash: ct.toString(),
            iv: ct.iv.toString()
        }
    }
}