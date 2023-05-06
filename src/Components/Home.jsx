import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdPin, IoLogoTwitter } from 'react-icons/io'
import { FiLink } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import {BsFillMoonFill,BsFillSunFill} from 'react-icons/bs'

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

    console.log(info);

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
                                <button><BsFillMoonFill/> Dark mode / <BsFillSunFill/> Light mode</button>
                            </div>
                        </div>

                        <input type="text" placeholder="Search GitHub username..." onChange={(e) => setUser(e.target.value)} onKeyDown={searchEnter} />
                        <button onClick={() => search()}>Search</button>

                        <div className="row mt-5">
                            <div className="col-md-3">
                                <img src={info.avatar_url} style={{ borderRadius: '50%' }} className='img-fluid' alt="" />
                            </div>
                            <div className="col-md-9">
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
                                        <p style={{ color: 'gray' }}>Joinded at {info.created_at}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <p>Repos</p>
                                        <h3>{info.public_repos}</h3>
                                    </div>
                                    <div className="col-md-4">
                                        <p>Followers</p>
                                        <h3>{info.followers}</h3>
                                    </div>
                                    <div className="col-md-4">
                                        <p>Following</p>
                                        <h3>{info.following}</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <IoMdPin />
                                        {
                                            info.location ?
                                                <span>{info.location}</span>
                                                :
                                                <span>Not Available</span>
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <IoLogoTwitter />
                                        {
                                            info.twitter_username ?
                                                <a href={info.twitter_username}>{info.twitter_username}</a>
                                                :
                                                <span>Not Available</span>
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <FiLink />
                                        {
                                            info.blog ?
                                                <a href={info.blog}>{info.blog}</a>
                                                :
                                                <span>Not Available</span>
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <HiOutlineBuildingOffice2 />
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