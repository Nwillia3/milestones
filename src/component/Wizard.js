// Source: https://codesandbox.io/s/km2n35kq3v
//         https://codesandbox.io/s/62nk7x0p73
import React from 'react'
import { Form } from 'react-final-form'

export default class Wizard extends React.Component {
  static Page = ({ children }) => children

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues || {},
      enableProviders: props.enableSocialProviders,
    }
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }))

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = values => {
    const { children, onSubmit } = this.props
    const { page } = this.state
    const isLastPage = page === React.Children.count(children) - 1
    if (isLastPage) {
      return onSubmit(values)
    } else {
      this.next(values)
    }
  }

  render() {
    const { children } = this.props
    const { page, values, enableProviders } = this.state
    const activePage = React.Children.toArray(children)[page]
    const isLastPage = page === React.Children.count(children) - 1

    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, submitting, values }) => (
          <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-16 pt-12 pb-16 mb-4"
          >
            <h3 class="text-center text-2xl">Milestones</h3>

            {activePage}
            <div className="buttons">
              {page > 0 && (
                <button 
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={this.previous}>
                  « Previous
                </button>
              )}

              {!isLastPage && ( 
                <div className="py-2">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next »</button>
                </div>
              )}
              
              {(isLastPage && !enableProviders) && (
                <button type="submit" disabled={submitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              )}
            </div>
          </form>
        )}
      </Form>
    )
  }
}
