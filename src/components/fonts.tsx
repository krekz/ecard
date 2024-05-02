import { Euphoria_Script, Mukta, DM_Sans,Plus_Jakarta_Sans } from "next/font/google";

export const euphoria = Euphoria_Script({
    subsets: ['latin'],
    weight: '400',
})

export const mukta = Mukta({
    subsets: ['latin'],
    weight: ['200','300','400','500','600','700','800'],
    style: 'normal'
})

export const dm_sans = DM_Sans({ 
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900','1000'],
    style: ['normal','italic']
})

export const jakarta_sans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['200','300','400','500','600','700','800'],
    style: ['normal','italic']
})


