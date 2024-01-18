import { useTheme } from "@emotion/react";

export interface IBaseIcon{
    selected?:boolean
}

export const useIconColor=(selected?:boolean)=>{
    const theme = useTheme() as any; //TODO: типизировать всю тему
    return selected ? theme.palette.icon.selected : theme.palette.icon.color
    
}