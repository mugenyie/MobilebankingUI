import loader from '../assets/loader.gif'

function Loader() {
  return (
    <div className='flex justify-center'>
        <img width="300px" src={loader} alt="loading" />
    </div>
  )
}

export default Loader