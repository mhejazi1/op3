import React from 'react'
import { Footer } from '../Components/Footer'
import { Header } from '../Components/Header'
import { NotificationSection } from '../Components/NotificationSection'
import { Home } from './Website/Home'
import { Team } from './Website/Team'
import { Career } from './Website/Career'
import { Contact } from './Website/Contact'
import { Properties } from './Website/Properties'
import { Route } from 'react-router'
import { Property } from './Website/Property'

export const WebsiteRoutes = () => {
    return (
        <>
            <Header />
            <Route component={Home} path="/" exact />
            <Route component={Home} path="/home" exact />
            <Route component={Team} path="/team" exact />
            <Route component={Career} path="/Career" exact />
            <Route component={Contact} path="/contact" exact />
            <Route component={Properties} path="/properties" exact />
            <Route component={Property} path="/property/:id" exact />
            <NotificationSection />
            <Footer />
        </>
    )
}
