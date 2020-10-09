import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const UsersTable = ({ users }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>&nbsp;</td>
          <th colSpan='2' ><strong>Blogs Created</strong></th>
        </tr>
        {users.map(( user ) => (
          <Fragment key={user.id}>
            <tr>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default UsersTable