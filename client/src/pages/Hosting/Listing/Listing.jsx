import React, { useMemo, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { IoIosSearch } from "react-icons/io";
import FilterHosting from '../../../components/FilterHosting/FilterHosting';
import useProperties from '../../../hooks/useProperties';
import { format } from 'date-fns';
import ActionHosting from '../../../components/actionHosting/actionHosting';
import { Link } from 'react-router-dom';



const Listing = () => {

    const { data, isError, isLoading } = useProperties()
    const [rowID, setRowID] = useState(null)
    const columns = useMemo(() =>
        [
            { field: 'id', headerName: 'ID', width: 70 },
            {
                field: 'listing',
                headerName: 'LISTINGS',
                width: 240,
                renderCell: (params) => (<Link to={`/editresidency/${params.row.id}`}>
                    <div onCl className='flex w-[230px] items-center' >
                        <img src={params.row.listing} className='w-[52px] rounded-md' />
                        <span className='truncate'>{params.row.listingTitle}</span>
                    </div>
                </Link>)
            },
            {
                field: 'baths',
                headerName: 'BATHS',
                type: 'number',
                width: 100
            },
            {
                field: 'beds',
                headerName: 'BEDS',
                type: 'number',
                width: 100
            },
            {
                field: 'location',
                headerName: 'LOCATION',
                width: 130,
                valueGetter: (params) =>
                    `${params.row.locationCity + "," || ''}  ${params.row.locationCountry || ''}`,
            },
            {
                field: 'lastmodified',
                headerName: 'LAST MODIFIED',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 160,
            },
            {
                field: 'action',
                headerName: 'ACTION',
                description: 'This column has a value getter and is not sortable.',
                type: "actions",
                renderCell: params => (<ActionHosting {...{ params, rowID, setRowID }} />)
            }
        ]
        , [data])


    const rows = useMemo(() => {
        if (!data) {
            return []
        }
        return data.map((res, i) => ({
            id: res.id,
            listing: res.photos[0]?.url,
            listingTitle: res.title,
            baths: res.placeSpace.bathrooms,
            beds: res.placeSpace.beds,
            locationCity: res.mapData?.city,
            locationCountry: res.mapData?.country,
            lastmodified: format(new Date(res.updatedAt), "MMM d")

        }))
    }, [data])

    console.log(data)

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between pt-[32px] px-[24px]'>
                <div className='text-[22px] font-semibold'>
                    10 listings
                </div>
                <div>
                    <button className='px-[16px] h-[40px] text-[14px] font-semibold border border-gray-950 rounded-md'>
                        <span>
                            +
                        </span>
                        <span className='ml-[8px]'>
                            Create listing
                        </span>
                    </button>
                </div>
            </div>
            <FilterHosting />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onCellEditStop={(params) => setRowID(params.id)}
                />
            </div>
        </div>
    )
}

export default Listing