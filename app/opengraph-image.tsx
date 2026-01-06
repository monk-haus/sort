import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'sort.lat - The Auto-Pilot Link-in-Bio'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFDF5',
          border: '20px solid #1A0B2E',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div style={{ fontSize: 130, fontWeight: 900, color: '#1A0B2E', letterSpacing: '-0.05em' }}>
            sort.lat
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1A0B2E',
            padding: '20px 60px',
            borderRadius: '50px',
            border: '4px solid #D4FF00',
          }}
        >
          <div style={{ fontSize: 40, color: '#D4FF00', fontWeight: 700, letterSpacing: '0.1em' }}>
             WAITLIST OPEN: BATCH 01
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}