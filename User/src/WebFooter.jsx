import './WebFooter.css';

function WebFooter() {
    return (  
        <div className="footer">
            <div className="logoIcon">
                <img className="logo" src="/images/facebook.png" data-title="Facebook" alt="Facebook" />
                <img className="logo" id="ins" src="/images/inster.png" data-title="Instagram" alt="Instagram" />
                <img className="logo" id="twit" src="/images/twitter.png" data-title="Twitter" alt="Twitter" />
                <img className="logo" src="/images/youtube.png" data-title="YouTube" alt="YouTube" />
            </div>
            <div>
                <p id="address">No. 490, R A De Mel Mawatha, Colombo 03.</p>
                <p>+94 11 2369099, +94 11 2369099</p>
            </div>
            <hr />
            <p id="copyright">&copy; {new Date().getFullYear()} Information and Communication Technology Agency (ICTA). All rights reserved.</p>
        </div>
    );
}

export default WebFooter;