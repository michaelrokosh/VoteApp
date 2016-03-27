C.MainFooter = React.createClass({
    render() {
        return (
          <footer className="page-footer green darken-1">
            <div className="container">
              <div className="row">
                <div className="col l6 s12">
                  <h5 className="white-text">Michael Rokosh</h5>
                  <p className="grey-text text-lighten-4">Feel free to get in touch with me!</p>
                </div>
                <div className="col l4 offset-l2 s12">
                  <h5 className="white-text">Contacts</h5>
                  <ul>
                    <li><a className="grey-text text-lighten-3" href="mailto:mike@jssolutionsdev.com?subject=Hi%20Michael!">Email</a></li>
                    <li><a className="grey-text text-lighten-3" href="https://ua.linkedin.com/in/michael-rokosh-54007754" target="_blank">Linkedin</a></li>
                    <li><a className="grey-text text-lighten-3" href="https://github.com/Praxie" target="_blank">Github</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-copyright">
              <div className="container">
              © 2016 VoteApp
              <a className="grey-text text-lighten-4 right" href="http://jssolutionsdev.com" target="_blank">JSSolutions</a>
              </div>
            </div>
          </footer>
        )
    }
});