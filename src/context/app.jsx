import React, { createContext, useState, useEffect } from 'react'
import styled from '@emotion/styled';

import { gradientList } from '../utils/constants'

export const AppContext = createContext({});

function AppProvider({children}) {
    const [gradient, setGradient] = useState({
        from: '#ec008c',
        to: '#fc6767'
    })

    const [sequence, setSequence] = useState({})

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
                setGradient,
                sequence,
                setSequence
            }}
        >
            <Background>
                {children}
            </Background>
        </AppContext.Provider>
    )
}

export default AppProvider