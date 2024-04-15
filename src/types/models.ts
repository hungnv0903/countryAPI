interface IName {
    common:string ; 
}

interface IFlags {
    alt:string ; 
    png:string ; 
    svg:string ; 
}

export interface ICountry{
    name: IName ; 
    capital:string [] ; 
    population:number ; 
    area:number ;
    flags:IFlags ; 
    timezones:string [] ;  
}