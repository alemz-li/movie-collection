import { useQuery } from '@tanstack/react-query'
import { getCollectionInfo } from '../api/collection'
import Loader from './Loader'

const CollectionInfo = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['collection_info'],
    queryFn: getCollectionInfo,
    keepPreviousData: true
  })

  if(isLoading) return <Loader />
  else if(isError) return <div>Error: {error}</div>

  return (
    <div className='container'>
      <div className='collection-info'>
        <h2>Collection</h2>
        <p>Currently, I own <span>{data.total}</span> movies (includes TV shows) in physical copies, in which vary between these formats:</p>
        {data.formats.map(format => ((<div className='collection-info__format' key={format._id}><strong>{format._id}:</strong> <span>{format.count}</span></div>)))}
        <div className='text-center'><small className='text-muted'>Collection growing and not updated in true time.</small></div>
      </div>
    </div>
  )
}

export default CollectionInfo
