import React from 'react'

class Signin extends React.Component {
  state = {
    signInEmail: '',
    signInPassword: ''
  }

  onEmailChange = (e) => {
    this.setState({
      signInEmail: e.target.value
    })
  }

  onPasswordChange = (e) => {
    this.setState({
      signInPassword: e.target.value
    })
  }

  onSubmitSignin = () => {
    fetch('http://localhost:8080/signin', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'Success') {
          this.props.onRouteChange('home')
        } else {
          console.log('sorry...')
        }
      })
  }

  render () {
    const {onRouteChange} = this.props
    return (
      <article className="mw6 center bg-grey br3 pa3 pa4-ns mv3 ba shadow-5 b--black-10">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmitSignin}
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Signin
