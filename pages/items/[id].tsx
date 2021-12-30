import { useRouter } from 'next/router'

// export const getStaticPaths = async () => {
//     const res = await fetch('http://localhost:4000/items');
//     const data = await res.json();

//     const paths = data.map(item => {
//         return {
//             params: {id: item['name'].toString()}
//         }
//     })

//     return {
//         paths: paths,
//         fallback: false
//     }
// }

// export const getStaticProps = async (context) => {
//     const id = context.params.id;
//     const res = fetch('http://localhost:4000/items/' + id);
//     const data = await res.json();

//     return {
//         props: {item: data}
//     }
// }

const Details = () => {
  const router = useRouter()
  const { id } = router.query

  return <div>Details card</div>
}

export default Details
