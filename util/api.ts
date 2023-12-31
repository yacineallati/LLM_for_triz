

const createURL = (path) =>  window.location.origin + path

export const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const deleteEntry = async (id) => {
    const res = await fetch(
      new Request(createURL(`/api/entry/${id}`), {
        method: 'DELETE',
      })
    )
  
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('Something went wrong on API server!')
    }
}

    
export const updateEntry = async (id, updates) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ updates }),
    })
  )
  if (res.ok) {
    return res.json()
  } else {
    throw new Error(`Something went wrong on API server! Status: ${res.status} ${res.statusText}`)
  }
}

export const newEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/entry'), {
      method: 'POST',
      body: JSON.stringify({ content: 'Write Something here' }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    console.error(`Error: ${res.status} ${res.statusText}`);
    throw new Error(`Something went wrong on API server! Status: ${res.status} ${res.statusText}`)
  }
}
export const askQuestion = async (question) => {
    const res = await fetch(
      new Request(createURL(`/api/question`), {
        method: 'POST',
        body: JSON.stringify({ question }),
      })
    )
  
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('Something went wrong on API server!')
    }
}
