import axios from 'axios';
import { CharacterResponse } from '../interfaces/Character';

const API_URL = 'https://futuramaapi.com/api/characters';
/**
 * OBTIENE LOS PERSONAJES DE fUTURAMA DESDE LA API
 */

export const getCharacters = async (): Promise<CharacterResponse> => {
    const response = await axios.get<CharacterResponse>(API_URL, {
        params: {
            orderBy: 'id',
            orderByDirection: 'asc',
            page: 1,
            size: 50,
        },
    });
    return response.data;
};