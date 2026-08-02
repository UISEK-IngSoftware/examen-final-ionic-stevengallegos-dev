export interface Character {
    id: number;
    name: string;
    gender: string;
    status: string;
    species: string;
    createdAt: string;
    image: string;

}

export interface CharacterResponse {
    items: Character[];
}