import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const testBlog = {
  author: 'Oscar Jauregui',
  title: 'Sports App Development with MERN Stack',
  url: 'www.awesomeapps.com',
}

const mockAddBlog = jest.fn()
const mockSetVisibility = jest.fn()

describe('<BlogForm />', () => {
  beforeEach(() => {
    render(
      <BlogForm
        setVisibility={mockSetVisibility}
        addBlog={mockAddBlog}
      />
    )
  })

  test('adding a new blog calls addBlog with the appropriate arguments', () => {
    const titleInput = screen.getByLabelText(/title/)
    const authorInput = screen.getByLabelText(/author/)
    const urlInput = screen.getByLabelText(/url/)

    userEvent.type(titleInput, testBlog.title)
    userEvent.type(authorInput, testBlog.author)
    userEvent.type(urlInput, testBlog.url)
    userEvent.click(screen.getByRole('button', { name: /create/i }))

    expect(mockAddBlog.mock.calls).toHaveLength(1)
    expect(mockAddBlog).toHaveBeenCalledWith(testBlog)
  })
})