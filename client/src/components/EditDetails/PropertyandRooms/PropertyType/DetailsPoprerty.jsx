import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import SelectEdit from '../../../SelectEdit/SelectEdit'
import { ListingType, PropertyType, places } from '../../../../utils/EditPropertyType'
import { useDispatch, useSelector } from 'react-redux'
import { setLocationType, setPlaceType } from '../../../../store/slices/EditPropSlice'
import { useParams } from 'react-router-dom'
import useEditProp from '../../../../hooks/useEditProp'

const DetailsPropanRoom = ({ setToggleEdit }) => {
    const { propertyId } = useParams()
    const { editProperty } = useEditProp();
    const [toggle, setToggle] = useState()
    const dispatch = useDispatch()

    const { locationType, placeType } = useSelector((state) => state.EditProp)

    const [ListplaceOptions, setListPlaceOptions] = useState(places)
    const [ListpropertyType, setListPropertyType] = useState([])
    const [ListlistingType, setListListingType] = useState([])

    const [propertyType, setPropertyType] = useState(locationType.name)
    const [listingType, setListingType] = useState(ListingType.find(item => item.id === placeType.id).name)
    const [placeOptions, setPlaceOptions] = useState(places.find(place => place.id === locationType.parentId).name)

    console.log(placeOptions)

    function pickPlaceHdl(id) {
        const filteredPropertyType = PropertyType.filter((item) => item.parentId == id);
        const filteredListingType = ListingType.filter((item) => item.parentId.includes(id));
        const selectedPlaceOption = ListplaceOptions.find(item => item.id === id);

        setListPropertyType(filteredPropertyType);
        setListListingType(filteredListingType);
        setPlaceOptions(selectedPlaceOption ? selectedPlaceOption.name : '');

        setPropertyType()
        setListingType()
    }
    function pickPropType(id) {
        const selectedPropertyType = ListpropertyType.find((item) => item.id === id);
        setPropertyType(selectedPropertyType ? selectedPropertyType.name : '');
    }

    function pickListType(id) {
        const selectedListingType = ListlistingType.find((item) => item.id === (id));
        setListingType(selectedListingType ? selectedListingType.name : '');
    }

    const handleClose = () => {
        setToggleEdit(false)
    }
    const handleSave = async () => {

        await dispatch(setLocationType({ parentId: places.find(place => place.name === placeOptions).id, name: propertyType }));
        await dispatch(setPlaceType({ id: ListingType.find(item => item.name === listingType).id, type: ListingType.find(item => item.name === listingType).data }))
        editProperty(propertyId)
    };

    return (
        <div className='border-[0.5px] rounded-xl'>
            <div className='pt-[24px] px-[24px]'>
                <div className='flex justify-between '>
                    <div className='flex flex-col'>
                        <span className='text-[16px] font-semibold'>Property type</span>
                        <span className='text-[12px] text-[#717171] mt-[4px]'>
                            Choose a property type that’s most like your place to set expectations for guests and help your listing appear in the right searches.

                        </span>
                    </div>
                    <div onClick={handleClose}>
                        <IoMdClose color='#717171' size={20} />
                    </div>
                </div>
                <SelectEdit toggle={toggle} setToggle={setToggle} title={"Which is most like your place?"} placeOptions={placeOptions} ListplaceOptions={ListplaceOptions} pickPlaceHdl={pickPlaceHdl} />
                <SelectEdit toggle={toggle} setToggle={setToggle} title={"Property type"} propertyType={propertyType} ListpropertyType={ListpropertyType} pickPropType={pickPropType} />
                <SelectEdit toggle={toggle} setToggle={setToggle} title={"Listing type"} listingType={listingType} ListlistingType={ListlistingType} pickListType={pickListType} />
            </div>
            <div className='border-t-[0.5px] mt-[16px] py-[16px] px-[24px]'>
                <div className='flex justify-between items-center'>
                    <div onClick={handleClose} className='text-[14px] font-semibold underline'>
                        Cancel
                    </div>
                    <div>
                        <button
                            onClick={handleSave}
                            className='rounded-[8px] text-[14px] font-semibold bg-black py-[8px] px-[12px] text-white'>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsPropanRoom