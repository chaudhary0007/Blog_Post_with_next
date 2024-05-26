import React, { useEffect, useState} from 'react'
import styles from '@/styles/blog.module.css'
import Link from 'next/link'
import * as fs from 'fs';

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);
  // useEffect(()=>{
  //   console.log("useeffect is runnning");
  //   fetch('http://localhost:3000/api/blogs').then((a)=>{
  //     return a.json();})
  //     .then((parsed)=>{
  //       setBlogs(parsed)
  //     })
  // },[])


return <div className={styles.container}>
<main className={styles.main}>
  {blogs.map((blogitem)=>{
    return <div key={blogitem.slug}> 
    <Link href={`/blogpost/${blogitem.slug}`}>
    <h3 className={styles.blogitemh3}>{blogitem.title}</h3></Link>
    <p className={styles.blogitemp}>{blogitem.metadesc.substr(0, 140)}</p>
  </div>
  })}
  </main></div>
  };

//   export async function getServerSideProps(context){
//     let data =await fetch(`http://localhost:3000/api/blogs`)
//     let allBlogs =await data.json()
//     return{
//       props: { allBlogs },
//     }
//   }

  export async function getStaticProps(context) { 
    let data = await fs.promises.readdir("blogdata");
    let myfile; 
    let allBlogs = [];
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
          console.log(item)
          myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8') 
          allBlogs.push(JSON.parse(myfile))
      }

      return {
        props: {allBlogs}, // will be passed to the page component as props
    

      }
    }
    export default Blog;
