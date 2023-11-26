import Link from "next/link";
import Image from "next/image";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Button from "./Button";

export default function CreateNewProject() {
  const router = useRouter();
  const { pathname } = router;
  function buatButton(){
    fontWeight=500
  }
  return (
    <Modal className="p-10 px-12 bg-navy  w-[350px] h-[460px] flex flex-col gap-4 justify-center items-center my-10">
        <p className="text-[20px] font-semibold mt-0 text-center" 
            style={{ color: "#D6D5A8", marginTop : '-1rem'}}>Create Project</p>

        <div style = {{background: '#D6D5A8', width:'260px', height:'400px', borderRadius:'10px', fontWeight:550}}>
            <section style={{marginLeft:'18px', marginTop:'20px', marginRight:'10px', marginBottom:'10px'}}>
                <label className="flex flex-col gap-2.5 color" style={{color: '#1B2430', fontSize:'14px'}}>
                    Project's Name
                    <input className="outline" style={{width:'225px', height:'25px', borderRadius:'4px'}}onChange={(e) => setProjectName(e.target.value)}/>
                </label>

                <label className="flex flex-col gap-2.5 color" style={{color: '#1B2430', fontSize:'14px', marginTop:'8px'}}>
                    Deadline Project
                    <input className="outline" style={{width:'225px', height:'25px', borderRadius:'4px'}}onChange={(e) => setName(e.target.value)}/>
                </label>

                <label className="flex flex-col gap-2.5 color" style={{color: '#1B2430', fontSize:'14px', marginTop:'8px'}}>
                    Add Other Contributor
                    <input className="outline" style={{width:'225px', height:'25px', borderRadius:'4px'}}onChange={(e) => setName(e.target.value)}/>
                </label>

                <label className="flex flex-col gap-2.5 color" style={{color: '#1B2430', fontSize:'14px', marginTop:'8px'}}>
                    Visibility
                    <input className="outline" style={{width:'225px', height:'25px', borderRadius:'4px'}}onChange={(e) => setName(e.target.value)}/>
                </label>
                <div className="flex justify-end w-[95%]" style={{marginTop:'20px'}}>
                    <Button className="mr-2" text="Create"/>
                </div>
            </section>
        </div>
    </Modal>
  );
}