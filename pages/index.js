import React, { useEffect, useState } from "react"

import Link from 'next/link'

import { projects } from '../data'

import Hero from "../components/Hero"
import Collections from "./Collections"


const Home = function ({obj}) {

  return (
    <>
     <Hero />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {obj: projects}
  }
}

export default Home
