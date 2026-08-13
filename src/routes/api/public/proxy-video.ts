import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/public/proxy-video')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url).searchParams.get('url')
        if (!url) return new Response('Missing url', { status: 400 })

        const response = await fetch(url)
        const { status, statusText, headers } = response

        // Mantém headers essenciais para streaming e cache
        const newHeaders = new Headers()
        headers.forEach((v, k) => {
          if (['content-type', 'content-length', 'accept-ranges', 'content-range', 'cache-control'].includes(k.toLowerCase())) {
            newHeaders.set(k, v)
          }
        })
        newHeaders.set('Access-Control-Allow-Origin', '*')

        return new Response(response.body, {
          status,
          statusText,
          headers: newHeaders,
        })
      }
    }
  }
})
