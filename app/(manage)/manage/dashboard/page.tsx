import {Input} from "@/app/components/Inputs";
import {Button, ButtonGroup} from "@/app/components/Buttons";
import {Card, CardTitle} from "@/app/components/Card";
import Link from "next/link";
import {ContactMessageTable} from "@/app/(manage)/manage/dashboard/components/ContactMessageTable";

export default async function Dashboard() {

  return (
    <>
      <div className="mb-2">
        <h1 className="section__title">Dashboard</h1>
        <p className="section__subtitle">Insight about the website</p>
      </div>
      <div>
        <ButtonGroup className="mb-1">
          <Button href="#" variant="white" size="small" active={true}>12 Months</Button>
          <Button href="#" variant="white" size="small">30 Days</Button>
          <Button href="#" variant="white" size="small">7 Days</Button>
          <Button href="#" variant="white" size="small" className="display-none display-md-inline-block">24 Hours</Button>
          <Button href="#" variant="white" size="small">All</Button>
        </ButtonGroup>
        <div className="display-grid col-lg-3 gap-1 mb-2">
          <Card color={"primary"} className="p-0">
            <div className="px-2 pt-1">
              <CardTitle>Visitor Hits <i className="uil-bolt-alt mr-0-5"></i></CardTitle>
              <CardTitle className="text-h1 weight-medium line-height-1">12.334</CardTitle>
            </div>
            <canvas id="chart-visitor" height="99" style={{display: "block", boxSizing: 'border-box', height: '99px', width: '352px'}} width="352"></canvas>
            <Link href="#" className="display-flex flex-align-center mt-auto px-2 pb-1">
              Visit Total <i className="uil-arrow-right ml-auto text-h3"></i>
            </Link>
          </Card>
          <Card>
            <CardTitle><i className="uil-bag mr-0-5"></i>Project Request</CardTitle>
            <canvas id="chart-project" height="162" style={{display: "block", boxSizing: 'border-box', height: '162px', width: '324px'}} width="324"></canvas>
          </Card>
          <div className="display-grid col-md-2 col-lg-1 gap-1">
            <Card>
              <CardTitle><i className="uil-image-plus mr-0-5"></i>Portfolio</CardTitle>
              <CardTitle className="text-h2 weight-medium mt-auto">12</CardTitle>
              <Link href="#" className="display-flex flex-align-center text-fade">Projects <i className="uil-arrow-right ml-auto text-h3"></i></Link>
            </Card>
            <Card>
              <CardTitle><i className="uil-image-plus mr-0-5"></i>Expertises</CardTitle>
              <CardTitle className="text-h2 weight-medium mt-auto">16</CardTitle>
              <Link href="#" className="display-flex flex-align-center text-fade">Skills <i className="uil-arrow-right ml-auto text-h3"></i></Link>
            </Card>
          </div>
        </div>

        <h4 className="mb-0-5">Contact Messages</h4>
        <div className="mb-0-5">
          <Input type="search" name="search" id="input-search" placeholder="Search message..." icon="uil-search" />
        </div>

        <ContactMessageTable />
      </div>
    </>
  )
}
