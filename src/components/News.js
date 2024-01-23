import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalResults, setTotalResults] = useState(0)
    // articles = [
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "WHIO"
    //         },
    //         "author": "WHIO Staff",
    //         "title": "Costco customer says interrogation triggered by new ID policy offended her - WHIO",
    //         "description": "Costco customer relates being confronted about her membership ID.",
    //         "url": "https://www.whio.com/news/local/costco-customer-has-advice-retailer-working-put-new-id-policy-into-effect/6DCM5WJOOND25AMFFFQLSGMKEY/",
    //         "urlToImage": "https://cmg-cmg-tv-10040-prod.cdn.arcpublishing.com/resizer/BMcTOeV0sKR4I2hgAUd0F1mu32Q=/1440x810/filters:format(jpg):quality(70)/d1hfln2sfez66z.cloudfront.net/06-29-2023/t_52fc35d169404f54b81880aaccac4a48_name_costco_bob.jpg",
    //         "publishedAt": "2023-06-29T11:50:21Z",
    //         "content": "CENTERVILLE — Longtime Costco customer Leronda Jackson was offended Wednesday when an employee at the retailers Centerville store claimed Jacksons face didnt match the one on the back of her membersh… [+3513 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "financial-times",
    //             "name": "Financial Times"
    //         },
    //         "author": "Leila Abboud, Sarah White",
    //         "title": "French police officer under investigation after teenager's fatal shooting - Financial Times",
    //         "description": "Clashes erupt for a second night as anger grows over death",
    //         "url": "https://www.ft.com/content/ab23b95c-a378-423d-a2bc-2fd4ef3ba994",
    //         "urlToImage": "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F42f65bc1-849f-4e42-85d8-5cad25652d0f.jpg?source=next-opengraph&fit=scale-down&width=900",
    //         "publishedAt": "2023-06-29T11:21:07Z",
    //         "content": "The French police officer who fatally shot a 17-year-old driver who evaded a traffic stop in a Paris suburb has been placed under formal investigation for voluntary homicide and will soon appear befo… [+4324 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "usa-today",
    //             "name": "USA Today"
    //         },
    //         "author": "Gabe Hauari",
    //         "title": "Air quality index today: Maps of Chicago, Pittsburgh, Detroit, DC, US - USA TODAY",
    //         "description": "Smoke from the Canadian wildfires continue to spread across the U.S., with cities such as Chicago, Detroit and Washington, D.C. feeling the impact.",
    //         "url": "https://www.usatoday.com/story/news/nation/2023/06/29/air-quality-index-map-today/70367839007/",
    //         "urlToImage": "https://www.usatoday.com/gcdn/presto/2023/06/28/USAT/d483b982-b7da-4e58-a49e-f0d37b65c4d7-Canada_Wildfire_US_Air_Quality_006.jpeg?crop=2499,1406,x0,y248&width=2499&height=1406&format=pjpg&auto=webp",
    //         "publishedAt": "2023-06-29T11:20:34Z",
    //         "content": "Poor air quality is expected to persist Thursday as the smoke continues to spread south.\r\nAccording to the National Weather Service, \"wildfire smoke from Canada will reduce air quality over parts of … [+1321 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "cbs-news",
    //             "name": "CBS News"
    //         },
    //         "author": null,
    //         "title": "Live Updates: Canadian wildfire smoke creates unhealthy air quality across Pittsburgh area - CBS Pittsburgh",
    //         "description": "A Code Red Air Quality Action Day has been issued by the Department of Environmental Protection for the second straight day.",
    //         "url": "https://www.cbsnews.com/pittsburgh/live-updates/live-updates-canadian-wildfire-smoke-clouds-pittsburgh-skies-air-quality-alerts-issued-for-western-pa/",
    //         "urlToImage": "https://assets1.cbsnewsstatic.com/hub/i/r/2023/06/29/57cb60c2-4ae4-4313-ac11-bfa86c7e554a/thumbnail/1200x630/75f47988a7c2148c25fed521323817ef/screenshot-2023-06-29-023201.png?v=f3503a7856c58c20acab4eae8bb1f0f4",
    //         "publishedAt": "2023-06-29T11:13:00Z",
    //         "content": "It's a different world from 24 hours ago. Crystal clear air over Beaver on Tuesday turned into a blanket of haze on Wednesday.  \r\nTravis Griffith from Beaver Falls described it as \"a burning in your … [+1789 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "politico",
    //             "name": "Politico"
    //         },
    //         "author": null,
    //         "title": "DeSantis angers Rockland's GOP chair - POLITICO - POLITICO",
    //         "description": null,
    //         "url": "https://www.politico.com/newsletters/new-york-playbook/2023/06/29/ron-desantis-angers-rockland-gop-chair-00104150",
    //         "urlToImage": "https://static.politico.com/5d/4f/69df0de3439b864dff3ee4c17a82/election-2024-desantis-71981.jpg",
    //         "publishedAt": "2023-06-29T11:01:20Z",
    //         "content": "Republican presidential candidate Florida Gov. Ron DeSantis speaks during a town hall event in Hollis, N.H., June 27, 2023. | Josh Reynolds/AP Photo\r\nFlorida Gov. Ron DeSantis irked an influential Ne… [+10362 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "cbs-news",
    //             "name": "CBS News"
    //         },
    //         "author": null,
    //         "title": "Woman loses leg after getting it trapped in Bangkok airport's moving walkway - CBS News",
    //         "description": "The passenger was headed to catch a flight from Bangkok when she was caught by the walkway. Medics eventually had to cut her left leg off above the knee.",
    //         "url": "https://www.cbsnews.com/news/bangkok-airport-woman-leg-amputated-moving-walkway-thailand/",
    //         "urlToImage": "https://assets3.cbsnewsstatic.com/hub/i/r/2023/06/29/f2579436-008a-476f-b90b-2354833427e1/thumbnail/1200x630/3183644a3aa9dde2f8cc735616c342e2/airport-moving-walkway-generic-1161916283.jpg?v=f3503a7856c58c20acab4eae8bb1f0f4",
    //         "publishedAt": "2023-06-29T10:38:51Z",
    //         "content": "Bangkok — A woman's leg had to be amputated in a Thai airport after it was trapped by a moving walkway Thursday, officials said. The 57-year-old Thai passenger was due to board a morning flight from … [+1986 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "the-washington-post",
    //             "name": "The Washington Post"
    //         },
    //         "author": "Ian Livingston, Victoria Bisset",
    //         "title": "Canada wildfire smoke spreads across Midwest, Eastern U.S.: live updates - The Washington Post",
    //         "description": "Smoke from Canada's wildfires is again drifting across large swaths of the United States, bringing air pollution and concerning air quality indexes. Follow live updates.",
    //         "url": "https://www.washingtonpost.com/weather/2023/06/29/canada-wildfire-smoke-air-quality-updates/",
    //         "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://d1i4t8bqe7zgj6.cloudfront.net/06-29-2023/t_ba50a4f32a3a42c788df5a74b03bd04c_name_chicago.png&w=1440",
    //         "publishedAt": "2023-06-29T10:18:45Z",
    //         "content": "Smoke continued to spill into Midwestern and Eastern swaths of the United States on Thursday a result of a historically bad wildfire season in Canada that continues unabated. Thick haze from those fi… [+293 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "financial-times",
    //             "name": "Financial Times"
    //         },
    //         "author": "Henry Foy, Max Seddon, Polina Ivanova",
    //         "title": "Russia detains 'General Armageddon' in crackdown on pro-Wagner elites - Financial Times",
    //         "description": "Sergei Surovikin was known to have had good relations with warlord Yevgeny Prigozhin",
    //         "url": "https://www.ft.com/content/e937199c-a5c1-45d9-85bc-85cf75a3528d",
    //         "urlToImage": "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F63781281-70d3-4d42-b7e6-21af8c9f3f98.jpg?source=next-opengraph&fit=scale-down&width=900",
    //         "publishedAt": "2023-06-29T10:09:47Z",
    //         "content": "Top Russian army general Sergei Surovikin has been detained as the Kremlin cracks down on Wagner sympathisers following the militias failed mutiny last week.\r\nSurovikin, a senior Russian general know… [+3940 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "the-washington-post",
    //             "name": "The Washington Post"
    //         },
    //         "author": "Kelsey Ables",
    //         "title": "Transgender care bans for Kentucky, Tennessee minors partly blocked - The Washington Post",
    //         "description": "Laws restricting such treatments have repeatedly met roadblocks in federal courts.",
    //         "url": "https://www.washingtonpost.com/nation/2023/06/29/transgender-ban-kentucky-tennessee-judge/",
    //         "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RO3M3OGHLZDV7TGSJNZL53Z2YI_size-normalized.JPG&w=1440",
    //         "publishedAt": "2023-06-29T07:02:00Z",
    //         "content": "Comment on this story\r\nComment\r\nJudges in Kentucky and Tennessee on Wednesday temporarily halted some restrictions on gender-affirming care for transgender youths shortly beforethe provisions were se… [+3941 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "cnn",
    //             "name": "CNN"
    //         },
    //         "author": "Paul P. Murphy, Kristina Sgueglia, Paula Newton",
    //         "title": "‘Presumed human remains’ found in wreckage of doomed Titan submersible, US Coast Guard says - CNN",
    //         "description": "“Presumed human remains” were among the debris and evidence recovered from the seafloor where the doomed Titan submersible’s remnants were found, the US Coast Guard said Wednesday.",
    //         "url": "https://www.cnn.com/2023/06/28/americas/titan-submersible-debris-st-johns/index.html",
    //         "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/230628102326-02-titan-debris-0628.jpg?c=16x9&q=w_800,c_fill",
    //         "publishedAt": "2023-06-29T06:31:00Z",
    //         "content": "Presumed human remains were among the debris and evidence recovered from the seafloor where the doomed Titan submersibles remnants were found, the US Coast Guard said Wednesday.\r\nThe remains were rec… [+3402 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "The Moscow Times"
    //         },
    //         "author": "AFP",
    //         "title": "Diplomatic Protest After Russian Strike Injures Colombians in Ukraine - The Moscow Times",
    //         "description": "Colombia's President Gustavo Petro said Wednesday that his country would send a note of diplomatic protest to Russia after three Colombians were injured in a missile strike that killed 12 in Ukraine.",
    //         "url": "https://www.themoscowtimes.com/2023/06/29/diplomatic-protest-after-russian-strike-injures-colombians-in-ukraine-a81686",
    //         "urlToImage": "https://static.themoscowtimes.com/image/og/70/81686__70e1907e37e97c2c49800f7182ee9c8e.jpg",
    //         "publishedAt": "2023-06-29T06:25:00Z",
    //         "content": "Colombia's President Gustavo Petro said Wednesday that his country would send a note of diplomatic protest to Russia after three Colombians were injured in a missile strike that killed 12 in Ukraine.… [+1281 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "SamMobile"
    //         },
    //         "author": "SamMobile, Asif Iqbal Shaik",
    //         "title": "Massive Galaxy S23 camera update now rolling out in India - SamMobile - Samsung news",
    //         "description": "Samsung delayed the June 2023 security update for the Galaxy S23 quite a bit as it was busy with adding ...",
    //         "url": "https://www.sammobile.com/news/massive-galaxy-s23-camera-update-released-india/",
    //         "urlToImage": "https://www.sammobile.com/wp-content/uploads/2023/02/Samsung-Galaxy-S23-S23-Plus-S23-Ultra.jpg",
    //         "publishedAt": "2023-06-29T04:24:00Z",
    //         "content": "Samsung delayed the June 2023 security update for the Galaxy S23 quite a bit as it was busy with adding various improvements to the camera. The update was first released in some Asian countries and t… [+1862 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "cbs-news",
    //             "name": "CBS News"
    //         },
    //         "author": "Marissa Armas",
    //         "title": "United Airlines passengers see day 2 of chaos at Denver International Airport - CBS Colardo",
    //         "description": "Day two of travel chaos for United passengers at Denver International Airport. Dozens of delays and cancellations now leading to a headache-inducing baggage claim area, as passengers searched for their belongings on Wednesday.",
    //         "url": "https://www.cbsnews.com/colorado/news/united-airlines-passengers-day-2-chaos-denver-international-airport/",
    //         "urlToImage": "https://assets1.cbsnewsstatic.com/hub/i/r/2023/06/29/d4ea137c-539e-4944-9ccb-66d60344b712/thumbnail/1200x630/19e077d1bac4e26beb7d2a9f309aee9c/holiday-travel-mess-10pkg-frame-1752.jpg?v=f3503a7856c58c20acab4eae8bb1f0f4",
    //         "publishedAt": "2023-06-29T04:11:00Z",
    //         "content": "Day two of travel chaos for United passengers at Denver International Airport. Dozens of delays and cancellations now leading to a headache-inducing baggage claim area, as passengers searched for the… [+2114 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "associated-press",
    //             "name": "Associated Press"
    //         },
    //         "author": "VANESSA GERA",
    //         "title": "Recapping the revolt in Russia, through the words of 4 presidents and a mutinous warlord - The Associated Press",
    //         "description": "The dramatic rebellion by a mercenary warlord in Russia that challenged President Vladimir Putin was punctuated by dramatic language of the key protagonists – and some long silences. Mercenary leader Yevgeny Prigozhin incited a rebellion and sent his troops t…",
    //         "url": "https://apnews.com/article/russia-revolt-putin-prigozhin-zelenskyy-lukashenko-biden-4ffe3c4d1f4f10cc8496d4a8bdf4103f",
    //         "urlToImage": "https://dims.apnews.com/dims4/default/4757840/2147483647/strip/true/crop/6000x3375+0+312/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fe1%2F72%2F7e8f17883a52ff6464e2b3f05729%2F91c20e7230584a97a14cc2a48550441c",
    //         "publishedAt": "2023-06-29T04:09:00Z",
    //         "content": "WARSAW, Poland (AP) Civil war. An evil that must be stopped. Fratricide. A bug about to be squashed.\r\nThe dramatic weekend rebellion by a mercenary warlord in Russia that challenged Russian President… [+8577 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "WCPO"
    //         },
    //         "author": "Jasmine Styles",
    //         "title": "Meet the biggest Swiftie going to Taylor Swift's concert in Cincinnati this weekend - WCPO 9 Cincinnati",
    //         "description": "Being a Swiftie is the reason John Drury is TikTok famous with more than 7 million likes on his videos and 500,000+ followers.",
    //         "url": "https://www.wcpo.com/news/local-news/meet-the-biggest-swiftie-going-to-taylor-swifts-concert-in-cincinnati-this-weekend",
    //         "urlToImage": "https://ewscripps.brightspotcdn.com/dims4/default/7195500/2147483647/strip/true/crop/1920x1008+0+36/resize/1200x630!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F8b%2F92%2Ff69c35d74dd883dbd07c871b57d1%2Fswiftie-trucker.png",
    //         "publishedAt": "2023-06-29T03:54:00Z",
    //         "content": "LIBERTY TOWNSHIP, Ohio If you think you're the biggest Swiftie, you might have some competition. John Drury also known as \"The Dancing Trucker\" on TikTok says he's looking forward to busting some mov… [+1536 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "Gizmodo.com"
    //         },
    //         "author": "Passant Rabie",
    //         "title": "Watch Live as Virgin Galactic Launches Its First Space Tourism Flight - Gizmodo",
    //         "description": "The mission is scheduled to take off on Thursday, a week after five passengers on board another extreme tourism venture were killed near the Titanic.",
    //         "url": "https://gizmodo.com/watch-live-as-virgin-galactic-launches-its-first-space-1850586733",
    //         "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/b569a6ce828a25c8d1079eda4a0fa43b.jpg",
    //         "publishedAt": "2023-06-29T03:00:00Z",
    //         "content": "Virgin Galactic is gearing up to send its first commercial crew to suborbital heights as part of the inaugural mission for the private space tourism venture.\r\nThe first mission, Galactic 01, is set t… [+3387 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "Investor's Business Daily"
    //         },
    //         "author": "Investor's Business Daily",
    //         "title": "Dow Jones Futures Rise: Palantir Flashes Buy Signal In Catch-22 Market; Micron Earnings Top | Investor's Business Daily - Investor's Business Daily",
    //         "description": null,
    //         "url": "https://www.investors.com/market-trend/stock-market-today/dow-jones-futures-palantir-flashes-buy-signal-in-catch-22-market-micron-earnings/",
    //         "urlToImage": null,
    //         "publishedAt": "2023-06-29T02:30:00Z",
    //         "content": null
    //     },
    //     {
    //         "source": {
    //             "id": "the-washington-post",
    //             "name": "The Washington Post"
    //         },
    //         "author": "Andrew Jeong",
    //         "title": "Madonna hospitalized in ICU with bacterial infection, postpones tour - The Washington Post",
    //         "description": "Madonna spent several days in intensive care but is expected to make a full recovery, her manager said. Her Celebration Tour will be rescheduled.",
    //         "url": "https://www.washingtonpost.com/arts-entertainment/2023/06/28/madonna-hospitalized-bacterial-infection-icu/",
    //         "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/3YOPOH2CRLTA2TC4U3NLV34NOQ.jpg&w=1440",
    //         "publishedAt": "2023-06-29T02:19:28Z",
    //         "content": "Comment on this story\r\nComment\r\nMadonna spent several days in intensive care after developing a serious bacterial infection on Saturday. Her manager said in a statement that she will be postponing a … [+541 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "usa-today",
    //             "name": "USA Today"
    //         },
    //         "author": "Tom Schad",
    //         "title": "No rip currents in area where Ryan Mallett drowned, officials reveal - USA TODAY",
    //         "description": "There were no rip currents where ex-NFL quarterback Ryan Mallett drowned, though authorities frequently receive calls there about distressed swimmers.",
    //         "url": "https://www.usatoday.com/story/sports/nfl/2023/06/28/ryan-mallett-death-no-rip-currents-in-area-of-drowning-officials-say/70367128007/",
    //         "urlToImage": "https://www.usatoday.com/gcdn/presto/2023/06/29/USAT/af8f0315-a10b-4dce-8313-3351f6b6948c-USATSI_9573843.jpg?crop=5759,3240,x0,y292&width=3200&height=1801&format=pjpg&auto=webp",
    //         "publishedAt": "2023-06-29T02:17:30Z",
    //         "content": "There were no rip currents in the section of Florida coastline where former NFL quarterback Ryan Mallett drowned Tuesday afternoon, according to a statement from Destin Beach Safety, which oversees l… [+5298 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "WESH Orlando"
    //         },
    //         "author": "Megan Mellado",
    //         "title": "Florida Department of Health issues statewide mosquito-borne illness advisory - WESH 2 Orlando",
    //         "description": "Floridians should practice applying bug spray, avoiding areas with high mosquito populations and wearing long pants and shirts when possible.",
    //         "url": "https://www.wesh.com/article/florida-mosquito-advisory-malaria/44371221",
    //         "urlToImage": "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/gettyimages-1403999523-649c38421f729.jpg?crop=1.00xw:0.846xh;0,0.154xh&resize=1200:*",
    //         "publishedAt": "2023-06-29T01:36:00Z",
    //         "content": "ORLANDO, Fla. —The Florida Department of Health has issued a statewide advisory for mosquito-borne illness after four confirmed cases of malaria in Sarasota County.\r\nFloridians should practice applyi… [+1784 chars]"
    //     }
    // ]

    const capitlizeText = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    // document.title = `${this.capitlizeText(props.category)} - NewsMonkey`;

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(50);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
    };

    //    const handlePrevClick = async () => {
    //         setPage(page-1)
    //         updateNews();
    //     }

    //    const handleNextClick = async () => {
    //         setPage(page+1)
    //         updateNews();
    //     }

    return (
        <>
            <h2 className='text-center'>NewsMonkey - Top {capitlizeText(props.category)} Headlines</h2>
            {loading && <Spiner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spiner />}
            >
                <div className="container mx-2">

                </div>
                <div className="row mx-3">
                    {/* {!this.state.loading && this.state.articles.map((element) => { */}
                    {articles.map((element) => {
                        return <div className="col md-2" key={element.url}>
                            <NewsItem title={element.title} imgUrl={element.urlToImage} description={element.description} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>;
                    })}
                </div>
            </InfiniteScroll>
        </>
        /* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={(this.state.page + 1) > Math.ceil(this.state.totalResult / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
