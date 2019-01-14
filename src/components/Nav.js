import React from 'react'
import {
  NavLink,
  Link,
} from 'react-router-dom'

const Nav = () => (
  <nav className="pa3 pa4-ns">
        <Link className="link dim black b f6 f5-ns dib mr3" to="/" title="Feed">
          Blog
        </Link>
        <NavLink
          className="link dim f6 f5-ns dib mr3 black"
          activeClassName="gray"
          exact={true}
          to="/"
          title="Feed"
        >
          Feed
        </NavLink>
        <NavLink
          className="link dim f6 f5-ns dib mr3 black"
          activeClassName="gray"
          exact={true}
          to="/drafts"
          title="Drafts"
        >
          Drafts
        </NavLink>
        <Link
          to="/create"
          className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
        >
          + Create Draft
        </Link>
      </nav>
);

export default Nav;