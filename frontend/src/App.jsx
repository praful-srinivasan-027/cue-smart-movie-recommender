import { useState } from 'react'
import './App.css'
import RotatingText from './RotatingText'
import { Routes, Route, Link } from "react-router-dom";
import Profile from "./Profile";
function App() {
  const [mood,setMood] = useState("")
   const [recommendations, setRecommendations] = useState(null)
  // { "movies": [
  //   {
  //     "adult": false,
  //     "backdrop_path": "/AvYsEYnj8h0495UhBYEXqK7hkFo.jpg",
  //     "genre_ids": [
  //       35,
  //       80,
  //       18,
  //       9648
  //     ],
  //     "id": 1287571,
  //     "original_language": "id",
  //     "original_title": "Agak Laen: Menyala Pantiku!",
  //     "overview": "After repeatedly failing their missions, Detectives Bene, Boris, Jegel, and Oki are given one last chance: to go undercover in a nursing home in search of a fugitive wanted for the murder of the mayor’s child.",
  //     "popularity": 4.7918,
  //     "poster_path": "/fPJ9OjLgAQoLZrPeL6ZfQwNkfPK.jpg",
  //     "release_date": "2025-11-27",
  //     "title": "Agak Laen: Menyala Pantiku!",
  //     "video": false,
  //     "vote_average": 8.3,
  //     "vote_count": 6,
  //     "reason": "The utterly peculiar premise of undercover detectives in a nursing home chasing a murderer embodies the quirky, offbeat, and darkly humorous vibe."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/dtGxDOcFssdUUTYBr6M6INXTI1e.jpg",
  //     "genre_ids": [
  //       35,
  //       18,
  //       80
  //     ],
  //     "id": 8321,
  //     "original_language": "en",
  //     "original_title": "In Bruges",
  //     "overview": "Ray and Ken, two hit men, are in Bruges, Belgium, waiting for their next mission. While they are there they have time to think and discuss their previous assignment. When the mission is revealed to Ken, it is not what he expected.",
  //     "popularity": 4.7597,
  //     "poster_path": "/vz3Vd6nfq9YZrVvyYx5RHFaYKV3.jpg",
  //     "release_date": "2008-02-08",
  //     "title": "In Bruges",
  //     "video": false,
  //     "vote_average": 7.499,
  //     "vote_count": 5673,
  //     "reason": "This film delivers a masterclass in darkly humorous, witty dialogue and peculiar character interactions against an unexpectedly beautiful backdrop."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/mkjdussWOjts0Se6hEwfTQdwCv2.jpg",
  //     "genre_ids": [
  //       35,
  //       80,
  //       18
  //     ],
  //     "id": 2757,
  //     "original_language": "en",
  //     "original_title": "Adaptation.",
  //     "overview": "Charlie Kaufman is a confused L.A. screenwriter overwhelmed by feelings of inadequacy, sexual frustration, self-loathing, and by the screenwriting ambitions of his freeloading twin brother Donald. While struggling to adapt \"The Orchid Thief,\" by Susan Orlean, Kaufman's life spins from pathetic to bizarre. The lives of Kaufman, Orlean's book, become strangely intertwined as each one's search for passion collides with the others'.",
  //     "popularity": 5.0008,
  //     "poster_path": "/ffEmHQAiD0m5dEQ6rlsuA9vlllW.jpg",
  //     "release_date": "2002-12-06",
  //     "title": "Adaptation.",
  //     "video": false,
  //     "vote_average": 7.34,
  //     "vote_count": 2730,
  //     "reason": "A brilliantly meta and unconventional film that is inherently quirky, absurdist, and darkly witty in its exploration of creativity and identity."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/2YOnE2qmoyyOUqQsFit12gDSauk.jpg",
  //     "genre_ids": [
  //       80,
  //       35,
  //       18
  //     ],
  //     "id": 1242419,
  //     "original_language": "en",
  //     "original_title": "Roofman",
  //     "overview": "A former Army Ranger and struggling father turns to robbing McDonald’s restaurants by cutting holes in their roofs, earning him the nickname \"Roofman.\" After escaping prison, he secretly lives inside a Toys “R” Us for six months, surviving undetected while planning his next move. But when he falls for a divorced mom drawn to his undeniable charm, his double life begins to unravel, setting off a compelling and suspenseful game of cat and mouse as his past closes in.",
  //     "popularity": 15.4506,
  //     "poster_path": "/wXDFtcnYtevleGzCmAD2ReQnJ4l.jpg",
  //     "release_date": "2025-10-08",
  //     "title": "Roofman",
  //     "video": false,
  //     "vote_average": 7.145,
  //     "vote_count": 628,
  //     "reason": "The peculiar true story of a man robbing McDonald's from the roof and later living in a Toys 'R' Us perfectly fits the offbeat and darkly humorous criteria."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/7Nwnmyzrtd0FkcRyPqmdzTPppQa.jpg",
  //     "genre_ids": [
  //       80,
  //       18,
  //       35
  //     ],
  //     "id": 106646,
  //     "original_language": "en",
  //     "original_title": "The Wolf of Wall Street",
  //     "overview": "A New York stockbroker refuses to cooperate in a large securities fraud case involving corruption on Wall Street, corporate banking world and mob infiltration. Based on Jordan Belfort's autobiography.",
  //     "popularity": 17.5522,
  //     "poster_path": "/kW9LmvYHAaS9iA0tHmZVq8hQYoq.jpg",
  //     "release_date": "2013-12-25",
  //     "title": "The Wolf of Wall Street",
  //     "video": false,
  //     "vote_average": 8.027,
  //     "vote_count": 25618,
  //     "reason": "An over-the-top, darkly humorous, and often absurd portrayal of excess and ambition, making it wildly unconventional."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/ot3eZ9XfOF42a3zFWluMPWkfCHB.jpg",
  //     "genre_ids": [
  //       80,
  //       35,
  //       18,
  //       36
  //     ],
  //     "id": 487558,
  //     "original_language": "en",
  //     "original_title": "BlacKkKlansman",
  //     "overview": "Colorado Springs, late 1970s. Ron Stallworth, an African American police officer, and Flip Zimmerman, his Jewish colleague, run an undercover operation to infiltrate the Ku Klux Klan.",
  //     "popularity": 5.9766,
  //     "poster_path": "/8jxqAvSDoneSKRczaK8v9X5gqBp.jpg",
  //     "release_date": "2018-08-09",
  //     "title": "BlacKkKlansman",
  //     "video": false,
  //     "vote_average": 7.491,
  //     "vote_count": 8008,
  //     "reason": "The premise of a Black police officer infiltrating the KKK, requiring a white partner to impersonate him, is inherently absurd, darkly humorous, and offbeat."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/qyheW3m6KPumuI5jiopNJcdFWLb.jpg",
  //     "genre_ids": [
  //       28,
  //       35,
  //       80,
  //       18
  //     ],
  //     "id": 337170,
  //     "original_language": "en",
  //     "original_title": "American Made",
  //     "overview": "The true story of pilot Barry Seal, who transported contraband for the CIA and the Medellin cartel in the 1980s.",
  //     "popularity": 67.635,
  //     "poster_path": "/23ILgoPSO5ShKcTZOuiTVfqFAUB.jpg",
  //     "release_date": "2017-08-18",
  //     "title": "American Made",
  //     "video": false,
  //     "vote_average": 6.901,
  //     "vote_count": 4904,
  //     "reason": "This true story is told with an irreverent, darkly humorous tone, showcasing the peculiar and unconventional life of a pilot turned drug runner for the CIA."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/oNoprEND25zXR6Fns8cIZUkuoMc.jpg",
  //     "genre_ids": [
  //       35,
  //       80,
  //       18
  //     ],
  //     "id": 308266,
  //     "original_language": "en",
  //     "original_title": "War Dogs",
  //     "overview": "Based on the true story of two young men, David Packouz and Efraim Diveroli, who won a $300 million contract from the Pentagon to arm America's allies in Afghanistan.",
  //     "popularity": 7.5983,
  //     "poster_path": "/mDcPRjZC1bb6LavFU3gwsWdVfCM.jpg",
  //     "release_date": "2016-08-18",
  //     "title": "War Dogs",
  //     "video": false,
  //     "vote_average": 6.938,
  //     "vote_count": 5395,
  //     "reason": "A true story infused with darkly humorous and absurd elements, following two young men who stumble into an unconventional arms dealing operation."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/smK3ud9IKSLVuRXdKauJ9p0DwNB.jpg",
  //     "genre_ids": [
  //       35,
  //       80,
  //       18
  //     ],
  //     "id": 2322,
  //     "original_language": "en",
  //     "original_title": "Sneakers",
  //     "overview": "When shadowy U.S. intelligence agents blackmail a reformed computer hacker and his eccentric team of security experts into stealing a code-breaking 'black box' from a Soviet-funded genius, they uncover a bigger conspiracy. Now, he and his 'sneakers' must save themselves and the world economy by retrieving the box from their blackmailers.",
  //     "popularity": 7.2833,
  //     "poster_path": "/l2pIGwCvpZEpBuMb55YBl6A04Jv.jpg",
  //     "release_date": "1992-09-09",
  //     "title": "Sneakers",
  //     "video": false,
  //     "vote_average": 6.911,
  //     "vote_count": 1031,
  //     "reason": "An offbeat caper featuring a quirky ensemble of eccentric security experts and witty dialogue as they uncover a high-stakes conspiracy."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/pA4J371Gk2F47vyGQOWapcsnOzz.jpg",
  //     "genre_ids": [
  //       80,
  //       53,
  //       18,
  //       35
  //     ],
  //     "id": 601666,
  //     "original_language": "en",
  //     "original_title": "I Care a Lot",
  //     "overview": "A court-appointed legal guardian defrauds her older clients and traps them under her care. But her latest mark comes with some unexpected baggage.",
  //     "popularity": 4.9835,
  //     "poster_path": "/gKnhEsjNefpKnUdAkn7INzIFLSu.jpg",
  //     "release_date": "2021-02-19",
  //     "title": "I Care a Lot",
  //     "video": false,
  //     "vote_average": 6.577,
  //     "vote_count": 2929,
  //     "reason": "This film presents a darkly humorous and cynical look at a peculiar legal guardian who exploits the elderly, featuring unconventional and morally ambiguous situations."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/eszmHIWJHAKdnJcE3KcvVzOb6Jd.jpg",
  //     "genre_ids": [
  //       35,
  //       80,
  //       28,
  //       18
  //     ],
  //     "id": 399170,
  //     "original_language": "en",
  //     "original_title": "Logan Lucky",
  //     "overview": "Trying to reverse a family curse, brothers Jimmy and Clyde Logan set out to execute an elaborate robbery during the legendary Coca-Cola 600 race at the Charlotte Motor Speedway.",
  //     "popularity": 5.5528,
  //     "poster_path": "/mQrhrBaaHvRfBQq0Px3HtVbH9iE.jpg",
  //     "release_date": "2017-08-17",
  //     "title": "Logan Lucky",
  //     "video": false,
  //     "vote_average": 6.734,
  //     "vote_count": 3783,
  //     "reason": "A quirky and offbeat heist film with a darkly humorous undertone, centered around a peculiar family trying to break a generational curse."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/zIUigIht3f9osNGyleF6B3jBbl7.jpg",
  //     "genre_ids": [
  //       35,
  //       80,
  //       18,
  //       9648,
  //       36
  //     ],
  //     "id": 270487,
  //     "original_language": "en",
  //     "original_title": "Hail, Caesar!",
  //     "overview": "When a Hollywood star mysteriously disappears in the middle of filming, the studio sends their fixer to get him back.",
  //     "popularity": 5.2631,
  //     "poster_path": "/ozY79UvbYvJUWFg2UCM1CDQ7rBl.jpg",
  //     "release_date": "2016-02-05",
  //     "title": "Hail, Caesar!",
  //     "video": false,
  //     "vote_average": 5.936,
  //     "vote_count": 3967,
  //     "reason": "A Coen Brothers film delivering an absurdist, peculiar, and witty take on old Hollywood, filled with eccentric characters and unexpected plot twists."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/bQObbnj0TY2Q1c55w78m1AN6VNX.jpg",
  //     "genre_ids": [
  //       28,
  //       80,
  //       37,
  //       35,
  //       18
  //     ],
  //     "id": 52629,
  //     "original_language": "es",
  //     "original_title": "El Infierno",
  //     "overview": "After being deported back to Mexico, a man has no choice but to join the vicious drug cartel that has corrupted his hometown in order to survive.",
  //     "popularity": 7.7998,
  //     "poster_path": "/ar8BpJ5xAzTIw9bqD9Sra6TjBvw.jpg",
  //     "release_date": "2010-09-03",
  //     "title": "El Infierno",
  //     "video": false,
  //     "vote_average": 7.882,
  //     "vote_count": 747,
  //     "reason": "A powerful, darkly humorous satire that offers a peculiar and unconventional look at the grim reality of cartel violence in Mexico."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/jkyqFgqmZlH5vSURckq0GgsewOY.jpg",
  //     "genre_ids": [
  //       35,
  //       80,
  //       18
  //     ],
  //     "id": 1574,
  //     "original_language": "en",
  //     "original_title": "Chicago",
  //     "overview": "Murderesses Velma Kelly and Roxie Hart find themselves on death row together and fight for the fame that will keep them from the gallows in 1920s Chicago.",
  //     "popularity": 4.769,
  //     "poster_path": "/3ED8cWCXY9zkx77Sd0N5qMbsdDP.jpg",
  //     "release_date": "2002-12-10",
  //     "title": "Chicago",
  //     "video": false,
  //     "vote_average": 7.122,
  //     "vote_count": 2862,
  //     "reason": "While a musical, its darkly humorous take on celebrity, crime, and justice, coupled with witty dialogue, makes it an unconventional watch."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/onJcliYmFoGM8NrAWs6sZl8mpCB.jpg",
  //     "genre_ids": [
  //       80,
  //       28,
  //       35,
  //       18
  //     ],
  //     "id": 25074,
  //     "original_language": "cn",
  //     "original_title": "奇蹟",
  //     "overview": "A country boy becomes the head of a gang through the purchase of some lucky roses from an old lady. He and a singer at the gang's nightclub try to do a good deed for the old lady when her daughter comes to visit.",
  //     "popularity": 4.5988,
  //     "poster_path": "/70OnveJQzlYji1TOoODNGrU9Mjj.jpg",
  //     "release_date": "1989-06-15",
  //     "title": "Miracles: The Canton Godfather",
  //     "video": false,
  //     "vote_average": 7.12,
  //     "vote_count": 179,
  //     "reason": "Jackie Chan's film offers an offbeat premise where a country boy inadvertently becomes a gang leader, leading to quirky and darkly humorous situations."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/9pdoEzieGdUTlRWTAO7QP8q1tIo.jpg",
  //     "genre_ids": [
  //       80,
  //       28,
  //       35,
  //       18,
  //       53
  //     ],
  //     "id": 1137179,
  //     "original_language": "ko",
  //     "original_title": "야당",
  //     "overview": "Navigating both the criminal underworld and law enforcement agencies, professional snitches called \"yadang\" provide covert information about the drug world to prosecutors and police. When a drug bust at a party attended by high-profile second-generation VIPs entangles those involved into a dangerous conspiracy, a seasoned yadang must do everything in his power not just to make it out on top, but alive.",
  //     "popularity": 5.4999,
  //     "poster_path": "/y7dsDbG8zVWkrkyOhA6ckZXX1uC.jpg",
  //     "release_date": "2025-04-16",
  //     "title": "Yadang: The Snitch",
  //     "video": false,
  //     "vote_average": 6.95,
  //     "vote_count": 40,
  //     "reason": "Features a witty and unconventional look into the world of professional informants, navigating complex moral landscapes."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/aP1mLolqpgNbu7NCPDS0v7uWzz1.jpg",
  //     "genre_ids": [
  //       18,
  //       35,
  //       80
  //     ],
  //     "id": 9291,
  //     "original_language": "en",
  //     "original_title": "The Longest Yard",
  //     "overview": "Disgraced pro football quarterback Paul Crewe lands in a Texas federal penitentiary, where manipulative Warden Hazen recruits him to advise the institution's football team of prison guards. Crewe suggests a tune-up game which lands him quarterbacking a crew of inmates in a game against the guards. Aided by incarcerated ex-NFL coach and player Nate Scarborough, Crewe and his team must overcome not only the bloodthirstiness of the opposition, but also the corrupt warden trying to fix the game against them.",
  //     "popularity": 6.0223,
  //     "poster_path": "/nbKcVBcxF96ARW2oKHqDYAcLdu.jpg",
  //     "release_date": "2005-05-27",
  //     "title": "The Longest Yard",
  //     "video": false,
  //     "vote_average": 6.668,
  //     "vote_count": 3620,
  //     "reason": "An unconventional prison football comedy that blends dark humor with its underdog story, featuring a peculiar cast of characters."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/vzvHhP8ZrDvOOx5fa9YC0OzDNIU.jpg",
  //     "genre_ids": [
  //       28,
  //       53,
  //       35,
  //       18,
  //       80
  //     ],
  //     "id": 9618,
  //     "original_language": "en",
  //     "original_title": "Tango & Cash",
  //     "overview": "Ray Tango and Gabriel Cash are two successful narcotics detectives who can't stand each other. Crime lord Yves Perret, furious at the loss of income they have caused him, plots an elaborate revenge against them.",
  //     "popularity": 6.2239,
  //     "poster_path": "/jxxxjTu87OSmQYkMFF7MgOEDXRn.jpg",
  //     "release_date": "1989-12-22",
  //     "title": "Tango & Cash",
  //     "video": false,
  //     "vote_average": 6.474,
  //     "vote_count": 2085,
  //     "reason": "A classic buddy-cop action-comedy with some witty banter, though less aligned with the deeper 'quirky' or 'absurdist' vibe."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/gYLSKuxOOmUGu0fZvErHz2FkZGl.jpg",
  //     "genre_ids": [
  //       28,
  //       12,
  //       35,
  //       80,
  //       18,
  //       53
  //     ],
  //     "id": 9404,
  //     "original_language": "cn",
  //     "original_title": "警察故事4之簡單任務",
  //     "overview": "Hong Kong cop Chan Ka-Kui returns, working with Interpol to track down and arrest an illegal weapons dealer. Chan later realizes that things are not as simple as they appear and soon finds himself to be a pawn of an organization posing as Russian intelligence.",
  //     "popularity": 4.5477,
  //     "poster_path": "/bRHbteT4IORJOXY0Qrnb4FPXRS0.jpg",
  //     "release_date": "1996-02-10",
  //     "title": "Police Story 4: First Strike",
  //     "video": false,
  //     "vote_average": 6.486,
  //     "vote_count": 523,
  //     "reason": "While an action-comedy with some physical humor, it doesn't strongly lean into the peculiar, absurdist, or offbeat aspects of the mood."
  //   },
  //   {
  //     "adult": false,
  //     "backdrop_path": "/2T6zTAacQMCQo3T4AsuZmB1htlM.jpg",
  //     "genre_ids": [
  //       35,
  //       80,
  //       18
  //     ],
  //     "id": 9879,
  //     "original_language": "en",
  //     "original_title": "Striptease",
  //     "overview": "Bounced from her job, Erin Grant needs money if she's to have any chance of winning back custody of her child. But, eventually, she must confront the naked truth: to take on the system, she'll have to take it all off. Erin strips to conquer, but she faces unintended circumstances when a hound dog of a Congressman zeroes in on her and sharpens the shady tools at his fingertips, including blackmail and murder.",
  //     "popularity": 4.8795,
  //     "poster_path": "/4zMy6R7acotCmGoDk4sjzRtDwKn.jpg",
  //     "release_date": "1996-06-28",
  //     "title": "Striptease",
  //     "video": false,
  //     "vote_average": 5.553,
  //     "vote_count": 1159,
  //     "reason": "This film has some dark elements and a cynical tone, but it doesn't primarily fit the quirky, offbeat, or absurdist mood keywords."
  //   }]})
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [selectedMovie,setSelectedMovie] = useState(null)
    //   "adult": false,
    //   "backdrop_path": "/7Nwnmyzrtd0FkcRyPqmdzTPppQa.jpg",
    //   "genre_ids": [
    //     80,
    //     18,
    //     35
    //   ],
    //   "id": 106646,
    //   "original_language": "en",
    //   "original_title": "The Wolf of Wall Street",
    //   "overview": "A New York stockbroker refuses to cooperate in a large securities fraud case involving corruption on Wall Street, corporate banking world and mob infiltration. Based on Jordan Belfort's autobiography.",
    //   "popularity": 17.5522,
    //   "poster_path": "/kW9LmvYHAaS9iA0tHmZVq8hQYoq.jpg",
    //   "release_date": "2013-12-25",
    //   "title": "The Wolf of Wall Street",
    //   "video": false,
    //   "vote_average": 8.027,
    //   "vote_count": 25618,
    //   "reason": "An over-the-top, darkly humorous, and often absurd portrayal of excess and ambition, making it wildly unconventional."
    // })
  const [selectedTrailer, setSelectedTrailer] = useState(null)
  async function handleSearch() {
    if(!mood) return;
    setLoading(true)
    try{
    const response = await fetch('http://localhost:3000/recommendations/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood }),
    });
    const data = await response.json();
    setRecommendations(data);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  } finally {
    setLoading(false)
  }
  }
  async function handleMovieClick(movie){
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=d0f5adbdc6ea20228422796812a43ddf`)
      const videoData = await response.json();
      const trailer = videoData.results.find(video => video.type === "Trailer" && video.site === "YouTube");
      const trailerKey = trailer ? trailer.key : null;
      setSelectedMovie(movie);
      setSelectedTrailer(trailerKey);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }
  return (
    <div className="App">
      <nav className="Navbar">
        <span className="Logo">Cue</span>
        <div className="NavLinks">
          <Link to='/'>Home</Link>
          <a href="#">WatchList</a>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={
          <>
      <div className="Hero">
        <span className="Tagline">Discover your next watch</span>
        <div className="Catch">
          <span className="Phrase">I'm in the mood for something</span>
          <RotatingText
            texts={['Funny', 'dark', 'emotional', 'thrilling','nostalgic']}
            mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
        <input type="text" placeholder="Make me laugh till my stomach hurts..." className="SearchBar" onChange={(e) => setMood(e.target.value)} />
        <button className="SearchButton" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {recommendations?.movies?.length > 0 && (
        <div className="Recommendations">
          {recommendations.movies.map((movie) => {
          console.log(movie)
          return <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} key={movie.id} onClick={() => handleMovieClick(movie)} />
        })}
        </div>
      )}
      {selectedMovie && (
        <div className="Overlay">
          <div className="OverlayCard">
            <div className="Fade">
              <button className="CloseButton" onClick={() => setSelectedMovie(null)}>X</button>
              <iframe src={`https://www.youtube.com/embed/${selectedTrailer}?autoplay=1&mute=0`} allow="autoplay" title={selectedMovie.title} allowFullScreen></iframe>
              <div className="TrailerFade" />
            </div>
            <h1>{selectedMovie.title}</h1>
            <br />
            <p className='Overview'>{selectedMovie.overview}</p>
            <br />
            <p className='Rating'>Vote Average: {selectedMovie.vote_average}</p>
            <br />
            <p className="Reason"><span>Reason:</span> {selectedMovie.reason}</p>
            <button className="SearchButton">Watch Movie Here</button>
          </div>
        </div>
      )}
      </>
      } />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
  
}

export default App
