import Banner from '@/components/Banner'
import CreatePoll from '@/components/CreatePoll'
import FeatureCards from '@/components/FeatureCards'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Head from 'next/head'

export default function Home() {

  return (
    <>
      <Head>
        <title>HNDapp - Transparencia Electoral Honduras</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen relative backdrop-blur">
        <div
          className="absolute inset-0 before:absolute before:inset-0
        before:w-full before:h-full before:bg-[url('/assets/images/bg.jpeg')]
        before:blur-sm before:z-[-1] before:bg-no-repeat before:bg-cover"
        />

        <section className="relative px-5 py-10 space-y-16 text-white sm:p-10">
          <Navbar />
          <Banner />
          <FeatureCards />
          <Footer />
        </section>
        <CreatePoll />
      </div>
    </>
  )
}

// No server-side props needed for main page anymore 