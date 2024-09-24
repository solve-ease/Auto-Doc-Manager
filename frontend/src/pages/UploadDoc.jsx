import { useEffect, useState } from 'react'
import styled from 'styled-components'

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const DocumentInput = styled.input``
const UploadForm = styled.form``
const SubmitButton = styled.button``
const UploadDoc = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  useEffect(() => {
    console.log(selectedFile)
  }, [selectedFile])
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!selectedFile) {
      alert('Please select a file first!')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)
    try {
      const response = await fetch('http://localhost:5000/api/upload-doc', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        console.log('File uploaded successfully:', data.text)
      } else {
        console.error('File upload failed:', response.statusText)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }
  return (
    <MainContainer>
      <UploadForm>
        <DocumentInput
          type='file'
          accept='application/pdf'
          onChange={handleFileChange}
        />
        <SubmitButton onClick={handleSubmit} type='submit'>
          Upload
        </SubmitButton>
      </UploadForm>
    </MainContainer>
  )
}

export default UploadDoc
