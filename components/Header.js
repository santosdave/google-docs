import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
function Header() {
    return(
        <header className="sticky top-0 z-50 flex items-center   px-4 py-2 shadow-md bg-white ">
            
            <Button
            color="gray"
            buttonType="outline"
            rounded={true}
            iconOnly={true}
            ripple={"dark"}
            className="sm:hidden md:inline-flex h-20 w-20 border-0"
            >
                <Icon name="menu" size="3xl"/>
            </Button>
            <Icon name="description" size="5xl" color="blue"/>
            <h1 className="sm:hidden md:inline-flex ml-2 text-gray-700 text-2xl">Docs</h1>
            <div className="mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:shadow-md">
                <Icon name="search" size="3xl" color="gray"/>
                <input type="text" placeholder="Search" className="flex-grow px-5 text-base outline-none bg-transparent border-0"/>
            </div>
            <Button
            color="gray"
            buttonType="outline"
            rounded={true}
            iconOnly={true}
            ripple={"dark"}
            className="sm:hidden md:inline-flex h-20 w-20 border-0"
            >
                <Icon name="apps" size="3xl"/>
            </Button>
            <img 
            loading="lazy"
            className="cursor-pointer h-12 w-12 rounded-full ml-2"
            src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg" 
            alt=""
            />
        </header>
        )
    
}

export default Header
