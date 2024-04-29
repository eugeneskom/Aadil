import React from 'react'

function About() {
  return (
    <div className='container mx-auto my-7 px-7'>
    <section className="mb-12 py-7">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
            nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl
            nisl sit amet nisl. Nullam euismod, nulla sit amet aliquam lacinia, nisl
            nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.
        </p>
    </section>

    <section className="mb-12 py-7">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
            nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl
            nisl sit amet nisl. Nullam euismod, nulla sit amet aliquam lacinia, nisl
            nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.
        </p>
    </section>

    <section className="mb-12 py-7">
        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                {/* <img src="team-member-1.jpg" alt="Team Member 1" className="w-full mb-4 rounded-lg" /> */}
                <h3 className="text-xl font-bold mb-2">John Doe</h3>
                <p className="text-gray-700">Founder & CEO</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                {/* <img src="team-member-2.jpg" alt="Team Member 2" className="w-full mb-4 rounded-lg" /> */}
                <h3 className="text-xl font-bold mb-2">Jane Smith</h3>
                <p className="text-gray-700">CTO</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                {/* <img src="team-member-3.jpg" alt="Team Member 3" className="w-full mb-4 rounded-lg" /> */}
                <h3 className="text-xl font-bold mb-2">Mike Johnson</h3>
                <p className="text-gray-700">Marketing Director</p>
            </div>
        </div>
    </section>
    </div>
  )
}

export default About