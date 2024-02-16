import React from 'react';
import Container from "@material-ui/core/Container";
import VerticalCarousel from "../../utils/vertical";
import { config } from "react-spring";
import Card from "../Cards/card";
import Grid from "@material-ui/core/Grid";


export default function Content(props) {
    const live_events = props.events
    let slides = []
    if(live_events.length > 0){
        Object.keys(live_events).map(function(key) {
            slides.push( {
                key: key,
                content: <Card event_details = {live_events[key]} />
            })
        });
    }

    return (
        props.events.length > 0 ? (
            // <div {...handlers}>
            <Grid container className="pt-2 mt-2 panel-bg pl-0 pr-0">
                <div
                    style={{
                        position: "fixed",
                        display: "flex",
                        flexDirection: "column",
                        width: "100vw",
                        height: "100vh",
                        margin: "0 auto",
                        background: "#424169"
                    }}
                >
                    {
                        live_events.length > 0 ? (
                            <VerticalCarousel
                                slides={slides}
                                offsetRadius={2}
                                showNavigation={false}
                                animationConfig={config.default}
                            />
                        ) : (
                            <Card event_details = {live_events[0]} customStyle={{
                                paddingTop: "5%",
                                marginTop: "0%",
                            }} />
                        )
                    }

                </div>
            </Grid>
            // </div>
            ) : (
            <Grid container className="pt-2 mt-2 panel-bg pl-0 pr-0">
                <div
                    style={{
                        position: "fixed",
                        display: "flex",
                        flexDirection: "column",
                        width: "100vw",
                        height: "100vh",
                        margin: "0 auto",
                        background: "#424169"
                    }}
                >
                    <div style={{width:"100%", textAlign:"center"}} className="mt-3">
                        <h2>No live matches found</h2>
                    </div>
                </div>
            </Grid>

        )



    );
}
