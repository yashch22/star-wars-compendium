export interface character {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
    image_url?: string;
}


export  interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: character[];
}


export interface PlanetDataType {
    name: string;
    terrain: string;
    climate: string;
    population: string;
}

export interface ModalProps {
    characterInfo: character;
    open: boolean;
    onClose: () => void;
}



export interface CharacterCardProps {
    characterInfo: character;
}

export interface CharacterListProps {
    recommendList: character[];
}