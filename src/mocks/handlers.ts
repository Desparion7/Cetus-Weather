// src/mocks/handlers.js
import {rest} from 'msw'
import weatherData from "@/assets/weatherData.ts";

export const handlers = [
    rest.get('/api/weather', (req, res, ctx) => {
        return res(
            ctx.delay(1000),
            ctx.status(200),
            ctx.json(weatherData)
        )
    }),
]
