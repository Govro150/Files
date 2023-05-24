const BYTES_IN_MB = 1048576

const form = document.getElementById('uploadForm')
const fileInput = document.getElementById('uploadForm_File')
const sizeText = document.getElementById('uploadForm_Size')
const statusText = document.getElementById('uploadForm_Status')
const progressBar = document.getElementById('progressBar')

fileInput.addEventListener('change', function () {
  const file = this.files[0]
  if (file.size > 100 * BYTES_IN_MB) {
    alert('File max size is 100 MB')
    this.value = null
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const fileToUpload = fileInput.files[0]
  const formSent = new FormData()
  const xhr = new XMLHttpRequest()

  if (fileInput.files.length > 0) {
    formSent.append('uploadForm_File', fileToUpload)

    // ???????? ?????? ? ????????????? ?? ??????? progress
    xhr.upload.addEventListener('progress', progressHandler, false)
    xhr.addEventListener('load', loadHandler, false)
    xhr.open('POST', 'upload.php')
    xhr.send(formSent)
  } else {
    alert('First choose file')
  }
  return false
});

function progressHandler(event) {
  // ??????? ?????? ???????????? ? ??????? ?? ??????? ???????
  const loadedMb = (event.loaded/BYTES_IN_MB).toFixed(1)
  const totalSizeMb = (event.total/BYTES_IN_MB).toFixed(1)
  const percentLoaded = Math.round((event.loaded / event.total) * 100)

  progressBar.value = percentLoaded
  sizeText.textContent = `${loadedMb} ?? ${totalSizeMb} ??`
  statusText.textContent = `Uploaded ${percentLoaded}% | `
}

function loadHandler(event) {
  statusText.textContent = event.target.responseText
  progressBar.value = 0
}