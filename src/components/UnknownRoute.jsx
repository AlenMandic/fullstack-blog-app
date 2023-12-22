import Alert from '@mui/material/Alert'
export default function UnknownRoute() {
  return  <div className="errorPage">
  <Alert severity="error" sx={{ fontSize: '20px', fontWeight: '600', my: '20px' }}>Ooops. That page is in another castle.</Alert>
  <h1 style={{ marginTop: '70px' }}>🛠️ Something went wrong. Ensure the path you are looking for exists.</h1>
  </div>
}