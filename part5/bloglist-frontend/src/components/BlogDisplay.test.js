import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogDisplay from './BlogDisplay'

describe('<BlogDisplay />', () => {
  const testBlog = {
    author: 'Oscar Jauregui',
    title: 'Sports App Development with MERN Stack',
    url: 'www.awesomeapps.com',
    likes: 134,
    user: {
      username: 'oscarj',
      name: 'Oscar Jauregui',
      id: 'abcdef123456'
    }
  }
  const mockUpdateBlog = jest.fn()
  const mockDeleteBlog = jest.fn()

  beforeEach(() => {
    mockUpdateBlog.mockRestore()
    mockDeleteBlog.mockRestore()
    render(
      <BlogDisplay
        blog={ testBlog }
        publisher={ 'oscarj' }
        updateBlog={ mockUpdateBlog }
        deleteBlog={ mockDeleteBlog }
      />
    )
  })

  test('only blog\'s title and author are displayed by default after first render', () => {
    const author = screen.queryByText(testBlog.author)
    const title = screen.queryByText(testBlog.title)
    const blogComplete = screen.queryByTestId('blog-complete')

    expect(blogComplete).toBeNull()
    expect(author).toBeDefined()
    expect(title).toBeDefined()
  })

  test('blog\'s url and likes count are displayed when clicking \'show\' button', () => {
    const showButton = screen.getByText(/show/)
    userEvent.click(showButton)

    screen.getByText(new RegExp(testBlog.likes))
    screen.getByText(new RegExp(testBlog.url))
  })

  test('when like button is clicked twice updateBlog function is called accordingly', () => {
    const showButton = screen.getByText(/show/)
    userEvent.click(showButton)

    const likesButton = screen.getByText(/like/)
    userEvent.dblClick(likesButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})