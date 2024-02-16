import React from "react";

function MarkUp (){
    return (
        <body>
        <div className="container">
            <div style={{width:'100%', display:'inline-block'}} className="first-pdd">
                <div style={{width:'50%', float:'left'}} className="">
                    <span className="betty-c">Betty365</span>
                </div>
                <div style={{width:'50%', float:'left'}} className="">
                    <div className="f-flex">
                        <div className="menu1">
                            <i className="fa fa-calendar fa-lg ic-b" aria-hidden="true"></i>
                            <br/>
                            <span className="d4">My Bets</span>
                        </div>
                        <div className="menu2">
                            <i className="fa fa-user fa-lg ic-b" aria-hidden="true"></i>
                            <br/>
                            <button className="btn d4" type="button"><span className="">&euro;25.00</span></button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-12 t-align f3-size">UEFA CHAMPION LEAGUE</div>
            </div>
            <div className="row">
                <div className="col-12 t-align date-m"><span className="refc">SUNDAY 28 FEBRUARY 2016</span></div>
            </div>
            <div className="row lr-margin lg-pdd martial-pdd">
                <div className="col  t-align f1-size"><img src="img/barcelona-logo.png" className="img-size"
                                                           alt="logo" /><br/>BARCELONA<br/>Martial 23</div>
                <div className="col c2 t-align"><span className="vsc">1<span
                    className="hiphen"> - </span>1</span><br/><span className="vsc2"> VS </span><br/><span
                    className="refc refont"> Ref Andre Marriner <br/>Att 65.221</span></div>
                <div className="col  t-align f1-size"><img src="img/manchester-united-logo.png" className="img-size"
                                                           alt="logo" /><br/>MAN UTD<br/>17 Barkley</div>
            </div>


            <div className="row">
                <div className="col  pd-t sec-clr">
                    Goal In Next 60 Sec &nbsp;
                    <button className="btn d30" type="button"><span className="">&euro;30</span></button>
                </div>
            </div>

            <div className="slidebtn">
                <div id="button-background">
                    <span className="slide-text">Swipe</span>
                    <div id="slider">
		<span id="locker" className="material-icons">
		    <i className="fa fa-futbol-o" aria-hidden="true"></i>
</span>
                    </div>
                </div>
            </div>

            <div className="quantity">
                <div className="row pd-button">
                    <div className="col">
                        <button className="btn minus-btn disabled" type="button"><span className="pm-class">-</span>
                        </button>
                        &nbsp;&nbsp;
                        <input type="text" id="quantity" value="1" />&nbsp;&nbsp;
                        <button className="btn plus-btn" type="button"><span className="pm-class">+</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="dollar">
                <button className="btn d1" type="button"><span className="">&euro;1</span></button>
                <button className="btn d2" type="button"><span className="">&euro;5</span></button>
                <button className="btn d3" type="button"><span className="">&euro;10</span></button>
            </div>

        </div>

        <footer className="footer2">
            <div className="container">
                <div className="row">
                    <div className="col ta-d rights-r">UEFA © 2001 - 2020. All rights reserved.</div>
                </div>
                <div className="row">
                    <div className="col ta-d lorems">Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                        type specimen book. <br/>
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.
                    </div>
                </div>
                <div className="row">
                    <div className="col ta-d top-p lorems">Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. <br/>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of type and scrambled it to make a type specimen
                        book. <br/>
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.</div>
                </div>

                <div className="social">
                    <a href=""><i className="fa fa-facebook-official social-1" aria-hidden="true"></i></a>
                    <a href=""><i className="fa fa-twitter social-2" aria-hidden="true"></i></a>
                    <a href=""><i className="fa fa-instagram social-3" aria-hidden="true"></i></a>
                </div>
            </div>
        </footer>
        </body>
    )
}

export default MarkUp