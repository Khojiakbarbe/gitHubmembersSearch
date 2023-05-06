import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdPin, IoLogoTwitter } from 'react-icons/io'
import { FiLink } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { BsSearch, BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

import { ThreeDots } from "react-loader-spinner";

export default function Home() {

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState('khojiakbarbe')

    const [info, setInfo] = useState([]);
    useEffect(() => {
        axios.get('https://api.github.com/users/' + user)
            .then(res => {
                setInfo(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])


    function search() {
        axios.get('https://api.github.com/users/' + user)
            .then(res => {
                setInfo(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    function searchEnter(event) {
        if (event.key === 'Enter') {
            axios.get('https://api.github.com/users/' + user)
                .then(res => {
                    setInfo(res.data)
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }
    }

    const [mode, setMode] = useState(true);

    if (mode) {
        document.body.style.background = '#F6F8FF';
        document.body.style.color = 'black';
    } else {
        document.body.style.background = '#141D2F';
        document.body.style.color = 'white';
    }


    const createdYear = new Date(info.created_at).getFullYear();
    const createdMonth = new Date(info.created_at).getUTCMonth();
    const createdDay = new Date(info.created_at).getDate();

    return (
        <div className="container">
            {
                loading ?
                    <div>
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="#4fa94d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    </div>
                    :
                    <>
                        <div className="row mt-5 mb-5">
                            <div className="col">
                                <h3>devfinder</h3>
                            </div>
                            <div className="col text-end">
                                <button style={{ backgroundColor: 'unset', border: 'none' }} onClick={() => setMode(!mode)}> {mode ? <>Dark <BsFillMoonFill /></> : <div style={{ color: 'white' }}>Light <BsFillSunFill /></div>}</button>
                            </div>
                        </div>

                        <div className="search" style={mode ? { backgroundColor: 'white' } : { backgroundColor: "#1E2A47" }}>
                            <BsSearch style={mode ? { color: 'black' } : { color: 'white' }} />
                            <input type="text" placeholder="Search GitHub username..." style={mode ? { color: 'black' } : { color: 'white' }} onChange={(e) => setUser(e.target.value)} onKeyDown={searchEnter} />
                            <button className="btn btn-primary" onClick={() => search()}>Search</button>
                        </div>

                        <div className="row mt-5 info" style={mode ? { backgroundColor: 'white' } : { backgroundColor: '#1E2A47' }}>
                            <div className="col-md-3 myColImg">
                                <img src={info.avatar_url} style={{ borderRadius: '50%' }} className='img-fluid' alt="" />
                            </div>
                            <div className="col-md-9 myColInfo">
                                <div className="row">
                                    <div className="col-md">
                                        <h1>{info.name}</h1>
                                        <a href={info.login}>@{info.login}</a>
                                        {
                                            info.bio ?
                                                <p>{info.bio}</p>
                                                :
                                                <p style={{ color: 'gray' }}>This profile has no bio</p>
                                        }
                                    </div>
                                    <div className="col-md-6 pt-3">
                                        <p style={{ color: 'gray' }}>Joinded {createdDay} {createdMonth} {createdYear}</p>
                                    </div>
                                </div>

                                <div className="row reposAndFollow" style={mode ? { backgroundColor: '#F6F8FF' } : { backgroundColor: '#141D2F' }}>
                                    <div className="col-md-4">
                                        <p>Repos</p>
                                        <h1>{info.public_repos}</h1>
                                    </div>
                                    <div className="col-md-4">
                                        <p>Followers</p>
                                        <h1>{info.followers}</h1>
                                    </div>
                                    <div className="col-md-4">
                                        <p>Following</p>
                                        <h1>{info.following}</h1>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="links">
                                        <IoMdPin style={{ width: '5%', height: "30px" }} />
                                        {
                                            info.location ?
                                                <span>{info.location}</span>
                                                :
                                                <span>Not Available</span>
                                        }
                                    </div>
                                    <div className="links">
                                        <IoLogoTwitter style={{ width: '5%', height: "30px" }} />
                                        {
                                            info.twitter_username ?
                                                <a href={info.twitter_username}>{info.twitter_username}</a>
                                                :
                                                <span>Not Available</span>
                                        }
                                    </div>
                                    <div className="links">
                                        <FiLink style={{ width: '5%', height: "30px" }} />
                                        {
                                            info.blog ?
                                                <a href={info.blog}>{info.blog}</a>
                                                :
                                                <span>Not Available</span>
                                        }
                                    </div>
                                    <div className="links">
                                        <HiOutlineBuildingOffice2 style={{ width: '5%', height: "30px" }} />
                                        {
                                            info.company ?
                                                <span>{info.company}</span>
                                                :
                                                <span>Not Available</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}