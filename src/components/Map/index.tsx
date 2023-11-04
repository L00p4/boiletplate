import { useRouter } from 'next/navigation'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

type Place = {
  id: string
  name: string
  slug: string
  location: {
    latitude: number
    longitude: number
  }
}

export type MapProps = {
  places?: Place[]
}

const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY
const MAPBOX_USERID = process.env.NEXT_PUBLIC_USERID
const MAPBOX_STYLEID = process.env.NEXT_PUBLIC_STYLEID

const CustomTileLayer = () => {
  return MAPBOX_API_KEY ? (
    <TileLayer
      attribution=""
      url={`https://api.mapbox.com/styles/v1/${MAPBOX_USERID}/${MAPBOX_STYLEID}/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_API_KEY}`}
    />
  ) : (
    <TileLayer
      attribution=""
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  )
}

const Map = ({ places }: MapProps) => {
  const router = useRouter()

  return (
    <MapContainer
      center={[0, 0]}
      zoom={3}
      style={{ height: '100%', width: '100%' }}
    >
      <CustomTileLayer />

      {places?.map(({ id, slug, name, location }) => {
        const { latitude, longitude } = location

        return (
          <Marker
            key={`place-${id}`}
            position={[latitude, longitude]}
            title={name}
            eventHandlers={{
              click: () => {
                router.push(`/place/${slug}`)
              }
            }}
          />
        )
      })}
    </MapContainer>
  )
}

export default Map

// mandei o código do arquivo de teste aqui para ver se é alguma coisa aqui que está impedindo o teste
// import { render, screen } from '@testing-library/react'
// import Map from '.'

// describe('<Map />', () => {
//   it('should render without any marker', () => {
//     render(<Map />)

//     expect(
//       screen.getByRole('link', {
//         name: /''/i
//       })
//     ).toBeInTheDocument()
//   })

//   it('should render with the marker in correct place', () => {
//     const place = {
//       id: '1',
//       name: 'Ubatuba',
//       slug: 'ubatuba',
//       location: {
//         latitude: 0,
//         longitude: 0
//       }
//     }

//     render(<Map places={[place]} />)

//     expect(screen.getByTitle(/ubatuba/i)).toBeInTheDocument()
//   })
// })
