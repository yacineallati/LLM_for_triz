'use client'
import { updateEntry, deleteEntry } from '@/util/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import Spinner from './Spinner'
import { useRouter } from 'next/navigation'

const Editor = ({ entry }: { entry: any }) => {
    const [text, setText] = useState(entry.content)
    const [currentEntry, setEntry] = useState(entry)
    const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()
    const handleDelete = async () => {
        await deleteEntry(entry.id)
        router.push('/triz')
      }
    useAutosave({
        data: text,
        onSave: async (_text) => {
            if (_text === entry.content) return
            setIsSaving(true)
            const data = await updateEntry(entry.id, {content: _text})
            console.log(data)
            setEntry(data.data)
            setIsSaving(false)
        },

    })
    return (
        <div className="w-full h-full grid grid-cols-3 gap-0 relative">
          <div className="absolute left-0 top-0 p-2">
            {isSaving ? (
              <Spinner />
            ) : (
              <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
            )}
          </div>
          <div className="col-span-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-full text-xl p-8"
            />
          </div>
          <div className="border-l border-black/5">
            <div
              className="h-[100px] bg-blue-600 text-white p-8"
            >
              <h2 className="text-2xl bg-blue-600 text-White">Analysis</h2>
            </div>
            <div>
            {!!currentEntry && (
              <ul role="list" className="divide-y divide-gray-200">
                <li className="py-4 px-8 flex items-center justify-between">
                  <div className="text-l font-semibold">Primary contradiction</div>
                  <div className="text-l">{currentEntry?.analysis?.primary_contradiction}</div>
                </li>
    
                <li className="py-4 px-8 flex items-center justify-between">
                  <div className="text-l font-semibold">secondary contradiction</div>
                  <div className="text-l">{currentEntry?.analysis?.secondary_contradiction}</div>
                </li>
    
                <li className="py-4 px-8 flex items-center justify-between">
                  <div className="text-l font-semibold">triz principles</div>
                  <div className="text-l">{currentEntry?.analysis?.Triz_principles}</div>
                </li>
                <li className="py-4 px-8 flex items-center justify-between">
                  <div className="text-l font-semibold">Innovative Solutions</div>
                  <div className="text-l">{currentEntry?.analysis?.Innovative_Solutions}</div>
                </li>
                <li className="py-4 px-8 flex items-center justify-between">
                  <div className="text-l font-semibold">Benefits</div>
                  <div className="text-l">{currentEntry?.analysis?.Benefits}</div>
                </li>
                <li className="py-4 px-8 flex items-center justify-between">
                  <div className="text-l font-semibold">Risks</div>
                  <div className="text-l">{currentEntry?.analysis?.Risks}</div>
                </li>
                <li className="py-4 px-8 flex items-center justify-between">
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Delete
                  </button>
                </li>
              </ul>)}
            </div>
          </div>
        </div>
      )
    }

export default Editor