import React, {useState} from 'react'

/**
 * Renders a form to input a repository.
 */
export function RepoForm (props) {
  const [text, setText] = useState('');

  function load(e) {
    e.preventDefault()
    props.onSubmit(text)
  }

  return(
    <form className="w-full mt-4">
      <div className="flex items-center">
        <input
          className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 appearance-none leading-normal"
          type="text"
          placeholder="Enter repository (owner/name)"
          name="name"
          value={text}
          onChange={e => setText(e.target.value)}/>
        <input
          type="submit"
          className="flex-shrink-0 btn btn-blue ml-2"
          onClick={(e) => load(e)}
          value="Load issues & comments"/>
      </div>
    </form>
  )
}
