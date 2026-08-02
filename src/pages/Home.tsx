import { useState } from 'react';
import {
  IonAvatar,
  IonBadge,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { getCharacters } from '../services/FuturamaService';
import { Character } from '../interfaces/Character';
import './Home.css';



const Home: React.FC = () => {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /**
   * OBTIENE LOS PERSONAJES DE FUTURAMA DESDE LA API
   */
  const loadCharacters = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getCharacters();
      setCharacters(response.items ?? []);
    } catch (error) {
      console.error('Error al obtener los personajes:', error);
      setError('No se pudieron obtener los personajes. Por favor, inténtalo de nuevo más tarde.');
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };
  /**
   * RECARGA LA INFORMACIÓN CUANDO EL USUARIO DESLIZA HACIA ABAJO 
   */

  const refresh = async (event: CustomEvent) => {
    await loadCharacters();
    event.detail.complete();
  };
  /**
 * Devuelve el color según el estado del personaje.
 */
const getStatusColor = (status: string) => {
  switch (status) {
    case 'ALIVE':
      return 'success';

    case 'DEAD':
      return 'danger';

    default:
      return 'warning';
    }
  };

  useIonViewWillEnter(() => {
    loadCharacters();
  });

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Personajes de Futurama</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonLoading
          isOpen={loading}
          message="Cargando personajes..."
        />
        {error && (
          <div className="error-message">
            <IonText color="danger">
              <p>
                {error}
              </p>
            </IonText>
          </div>
        )}

        {!loading && !error && characters.length === 0 && (
          <div className="status-message">
            <IonText color="medium">
              <p>
                No se encontraron personajes.
              </p>
            </IonText>
          </div>
        )}

        {!loading && !error && characters.length > 0 && (
          <IonList>
            {characters.map((character) => (
              <IonItem key={character.id}>
                <IonAvatar slot="start">
                  <img src={character.image || 
                  'https://ionicframework.com/docs/img/demos/avatar.svg'
                  }
                    alt={character.name}
                    onError={(event) => {
                      event.currentTarget.src = 'https://ionicframework.com/docs/img/demos/avatar.svg';
                    }}
                  />
                </IonAvatar>

                <IonLabel>
                  <h2>{character.name}</h2>
                  <p>Género: {character.gender}</p>
                  <p>Estado:{' '}
                    <IonBadge color={getStatusColor(character.status)}>
                      {character.status}
                    </IonBadge>
                  </p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
