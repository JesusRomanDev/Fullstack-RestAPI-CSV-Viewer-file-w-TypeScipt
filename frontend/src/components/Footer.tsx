const Footer = () => {
    const fecha = new Date().getFullYear();
  return (
    <div className="w-screen fixed bottom-0 text-black bg-blue-500 py-5 flex justify-center gap-5">
        <p className="text-white">©{fecha} Eduardo Roman. All rights reserved.</p>
        <a aria-label='GitHub' target='_blank' href="https://github.com/JesusRomanDev"><svg xmlns="http://www.w3.org/2000/svg" className="hover:scale-125 hover:duration-300 ease-out duration-300 icon icon-tabler icon-tabler-brand-github" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ece0e0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                            </svg></a>
    </div>
  )
}

export default Footer