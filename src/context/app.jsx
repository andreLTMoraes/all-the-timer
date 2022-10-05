import React, { createContext, useState, useEffect } from 'react'
import styled from '@emotion/styled';

export const AppContext = createContext({});

function AppProvider({children}) {
    const [gradient, setGradient] = useState({
        from: '#ec008c',
        to: '#fc6767'
    })

    const gradientList = [
        { // Dimigo
            from: '#ec008c',
            to: '#fc6767'
        },
        { // Sunrise
            from: '#ff512f',
            to: '#f09819'
        },
        { // Sea Blue
            from: '#2b5876',
            to: '#4e4376'
        },
        { // Nimvelo
            from: '#314755',
            to: '#26a0da'
        },
        { // Emerald Water
            from: '#348f50',
            to: '#56b4d3'
        },
        { // Lemon Twist
            from: '#3ca55c',
            to: '#b5ac49'
        },
        { // Rose Water
            from: '#e55d87', 
            to: '#5fc3e4'
        },
        { // Aubergine
            from: '#aa076b', 
            to: '#61045f'
        },
        { // Aqua Marine
            from: '#1a2980', 
            to: '#26d0ce'
        },
        { // Mirage
            from: '#16222a',
            to: '#3a6073'
        }
    ]

    useEffect(() => {
        const idx = Math.floor(Math.random() * 10);
        setGradient(gradientList[idx])
    }, [])

    const Background = styled('div')`
        background: ${gradient.from};
        background: -webkit-linear-gradient(to left, ${gradient.from}, ${gradient.to});
        background: linear-gradient(to left, ${gradient.from}, ${gradient.to});
    `;

    return(
        <AppContext.Provider
            value={{
                setGradient
            }}
        >
            <Background>
                {children}
            </Background>
        </AppContext.Provider>
    )
}

export default AppProvider