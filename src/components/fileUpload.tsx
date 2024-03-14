import { useEdgeStore } from '@/lib/edgestore'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {}

const FileUpload = (props: Props) => {

    const {edgestore} = useEdgeStore()
    const {mutate, isPending} = useMutation({
        mutationFn: (url:string)  =>{
          return axios.post('/api/create-chat',{
            url,
          })
        }
    })

    const {getRootProps, getInputProps} = useDropzone({
        accept:{
            'application/pdf':['.pdf']
        },maxFiles:1,
        onDrop: async(acceptedFiles)=>{
            const file = acceptedFiles[0]
            const data = await edgestore.publicFiles.upload({
                file,
                onProgressChange:(progress)=>{
                    console.log(progress)
                }
            })
            mutate(data.url)
            
        }
    })
  return (
    <div  className="flex mt-4 items-center justify-center w-full  max-w-5xl">
    <div {...getRootProps({ className:"flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"})} >
        <input  {...getInputProps({})} />
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            
        </div>
        
    </div>
</div>
  )
}

export default FileUpload