import { useState } from "react";
import image from "../images/juzenglogo.png";
  const Calendar: React.FC = () => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    console.log("Button clicked in Calendar");
  };
  return (
    <div>
      <div id="preloader">
        <div className="sk-three-bounce">
          <div className="sk-child sk-bounce1"></div>
          <div className="sk-child sk-bounce2"></div>
          <div className="sk-child sk-bounce3"></div>
        </div>
      </div>

      <div id="main-wrapper">
        <div className="nav-header">
          <a href="index.html" className="brand-logo">
            
            <img
                      src={image}
                      className="logo-compact"
                      alt="Bitcoin"
                    />
            
          </a>
          <div className="nav-control">
            <div className="hamburger">
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
          </div>
        </div>

        {/***********************************
            Chat box start
        ************************************/}
		<div className="chatbox">
			<div className="chatbox-close"></div>
			<div className="custom-tab-1">
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<a className="nav-link" data-bs-toggle="tab" href="#notes">Notes</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" data-bs-toggle="tab" href="#alerts">Alerts</a>
					</li>
					<li className="nav-item">
						<a className="nav-link active" data-bs-toggle="tab" href="#chat">Chat</a>
					</li>
				</ul>
				<div className="tab-content">
					<div className="tab-pane fade active show" id="chat" role="tabpanel">
						<div className="card mb-sm-3 mb-md-0 contacts_card dlab-chat-user-box">
							<div className="card-header chat-list-header text-center">
								<a href="#" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18px"
        height="18px"
        viewBox="0 0 24 24"
        version="1.1"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect fill="#000000" x="4" y="11" width="16" height="2" rx="1" />
          <rect
            fill="#000000"
            opacity="0.3"
            transform="translate(12, 12) rotate(-270) translate(-12, -12)"
            x="4"
            y="11"
            width="16"
            height="2"
            rx="1"
          />
        </g>
      </svg>
    </a>
								<div>
									<h6 className="mb-1">Chat List</h6>
									<p className="mb-0">Show All</p>
								</div>
								<a href="#" onClick={(e) => e.preventDefault()}><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg></a>
							</div>
							<div className="card-body contacts_body p-0 dlab-scroll  " id="dlab_W_Contacts_Body">
								<ul className="contacts">
									<li className="name-first-letter">A</li>
									<li className="active dlab-chat-user">
										<div className="d-flex bd-highlight">
											<div className="img_cont">
												<img src="images/avatar/1.jpg" className="rounded-circle user_img" alt=""/>
												<span className="online_icon"></span>
											</div>
											<div className="user_info">
												<span>Archie Parker</span>
												<p>Kalid is online</p>
											</div>
										</div>
									</li>
									
									
									
							
									<li className="name-first-letter">B</li>
									<li className="dlab-chat-user">
										<div className="d-flex bd-highlight">
											<div className="img_cont">
												<img src="images/avatar/5.jpg" className="rounded-circle user_img" alt=""/>
												<span className="online_icon offline"></span>
											</div>
											<div className="user_info">
												<span>Bashid Samim</span>
												<p>Rashid left 50 mins ago</p>
											</div>
										</div>
									</li>
									
								</ul>
							</div>
						</div>
						<div className="card chat dlab-chat-history-box d-none">
							<div className="card-header chat-list-header text-center">
								<a href="#" onClick={(e) => e.preventDefault()} className="dlab-chat-history-back">
									<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><polygon points="0 0 24 0 24 24 0 24"/><rect fill="#000000" opacity="0.3" transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) " x="14" y="7" width="2" height="10" rx="1"/><path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fillRule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "/></g></svg>
								</a>
								<div>
									<h6 className="mb-1">Chat with Khelesh</h6>
									<p className="mb-0 text-success">Online</p>
								</div>							
								<div className="dropdown">
									<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="dropdown" ><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg></a>
									<ul className="dropdown-menu dropdown-menu-right">
										<li className="dropdown-item"><i className="fa fa-user-circle text-primary me-2"></i> View profile</li>
										<li className="dropdown-item"><i className="fa fa-users text-primary me-2"></i> Add to close friends</li>
										<li className="dropdown-item"><i className="fa fa-plus text-primary me-2"></i> Add to group</li>
										<li className="dropdown-item"><i className="fa fa-ban text-primary me-2"></i> Block</li>
									</ul>
								</div>
							</div>
							<div className="card-body msg_card_body dlab-scroll" id="dlab_W_Contacts_Body3">
								<div className="d-flex justify-content-start mb-4">
									<div className="img_cont_msg">
										<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
									<div className="msg_cotainer">
										Hi, how are you samim?
										<span className="msg_time">8:40 AM, Today</span>
									</div>
								</div>
								<div className="d-flex justify-content-end mb-4">
									<div className="msg_cotainer_send">
										Hi Khalid i am good tnx how about you?
										<span className="msg_time_send">8:55 AM, Today</span>
									</div>
									<div className="img_cont_msg">
								<img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
								</div>
								<div className="d-flex justify-content-start mb-4">
									<div className="img_cont_msg">
										<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
									<div className="msg_cotainer">
										I am good too, thank you for your chat template
										<span className="msg_time">9:00 AM, Today</span>
									</div>
								</div>
								<div className="d-flex justify-content-end mb-4">
									<div className="msg_cotainer_send">
										You are welcome
										<span className="msg_time_send">9:05 AM, Today</span>
									</div>
									<div className="img_cont_msg">
								<img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
								</div>
								<div className="d-flex justify-content-start mb-4">
									<div className="img_cont_msg">
										<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
									<div className="msg_cotainer">
										I am looking for your next templates
										<span className="msg_time">9:07 AM, Today</span>
									</div>
								</div>
								<div className="d-flex justify-content-end mb-4">
									<div className="msg_cotainer_send">
										Ok, thank you have a good day
										<span className="msg_time_send">9:10 AM, Today</span>
									</div>
									<div className="img_cont_msg">
										<img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
								</div>
								<div className="d-flex justify-content-start mb-4">
									<div className="img_cont_msg">
										<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
									<div className="msg_cotainer">
										Bye, see you
										<span className="msg_time">9:12 AM, Today</span>
									</div>
								</div>
								<div className="d-flex justify-content-start mb-4">
									<div className="img_cont_msg">
										<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
									<div className="msg_cotainer">
										Hi, how are you samim?
										<span className="msg_time">8:40 AM, Today</span>
									</div>
								</div>
								<div className="d-flex justify-content-end mb-4">
									<div className="msg_cotainer_send">
										Hi Khalid i am good tnx how about you?
										<span className="msg_time_send">8:55 AM, Today</span>
									</div>
									<div className="img_cont_msg">
								<img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
								</div>
								<div className="d-flex justify-content-start mb-4">
									<div className="img_cont_msg">
										<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
									<div className="msg_cotainer">
										I am good too, thank you for your chat template
										<span className="msg_time">9:00 AM, Today</span>
									</div>
								</div>
								<div className="d-flex justify-content-end mb-4">
									<div className="msg_cotainer_send">
										You are welcome
										<span className="msg_time_send">9:05 AM, Today</span>
									</div>
									<div className="img_cont_msg">
								<img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
								</div>
								<div className="d-flex justify-content-start mb-4">
									<div className="img_cont_msg">
										<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
									<div className="msg_cotainer">
										I am looking for your next templates
										<span className="msg_time">9:07 AM, Today</span>
									</div>
								</div>
								<div className="d-flex justify-content-end mb-4">
									<div className="msg_cotainer_send">
										Ok, thank you have a good day
										<span className="msg_time_send">9:10 AM, Today</span>
									</div>
									<div className="img_cont_msg">
										<img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
								</div>
								<div className="d-flex justify-content-start mb-4">
									<div className="img_cont_msg">
										<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
									</div>
									<div className="msg_cotainer">
										Bye, see you
										<span className="msg_time">9:12 AM, Today</span>
									</div>
								</div>
							</div>
							<div className="card-footer type_msg">
								<div className="input-group">
									<textarea className="form-control" placeholder="Type your message..."></textarea>
									<div className="input-group-append">
										<button type="button" className="btn btn-primary"><i className="fa fa-location-arrow"></i></button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="tab-pane fade" id="alerts" role="tabpanel">
						<div className="card mb-sm-3 mb-md-0 contacts_card">
							<div className="card-header chat-list-header text-center">
								<a href="#" onClick={(e) => e.preventDefault()}><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg></a>
								<div>
									<h6 className="mb-1">Notications</h6>
									<p className="mb-0">Show All</p>
								</div>
								<a href="#" onClick={(e) => e.preventDefault()}><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3"/><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fillRule="nonzero"/></g></svg></a>
							</div>
							<div className="card-body contacts_body p-0 dlab-scroll" id="dlab_W_Contacts_Body1">
								<ul className="contacts">
									<li className="name-first-letter">SEVER STATUS</li>
									<li className="active">
										<div className="d-flex bd-highlight">
											<div className="img_cont primary">KK</div>
											<div className="user_info">
												<span>David Nester Birthday</span>
												<p className="text-primary">Today</p>
											</div>
										</div>
									</li>
									<li className="name-first-letter">SOCIAL</li>
									<li>
										<div className="d-flex bd-highlight">
											<div className="img_cont success">RU<i className="icon fa-birthday-cake"></i></div>
											<div className="user_info">
												<span>Perfection Simplified</span>
												<p>Jame Smith commented on your status</p>
											</div>
										</div>
									</li>
									<li className="name-first-letter">SEVER STATUS</li>
									<li>
										<div className="d-flex bd-highlight">
											<div className="img_cont primary">AU<i className="icon fa fa-user-plus"></i></div>
											<div className="user_info">
												<span>AharlieKane</span>
												<p>Sami is online</p>
											</div>
										</div>
									</li>
									
								</ul>
							</div>
							<div className="card-footer"></div>
						</div>
					</div>
					<div className="tab-pane fade" id="notes">
						<div className="card mb-sm-3 mb-md-0 note_card">
							<div className="card-header chat-list-header text-center">
								<a href="#" onClick={(e) => e.preventDefault()}><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect fill="#000000" x="4" y="11" width="16" height="2" rx="1"/><rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x="4" y="11" width="16" height="2" rx="1"/></g></svg></a>
								<div>
									<h6 className="mb-1">Notes</h6>
									<p className="mb-0">Add New Nots</p>
								</div>
								<a href="#" onClick={(e) => e.preventDefault()}><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3"/><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fillRule="nonzero"/></g></svg></a>
							</div>
							<div className="card-body contacts_body p-0 dlab-scroll" id="dlab_W_Contacts_Body2">
								<ul className="contacts">
									<li className="active">
										<div className="d-flex bd-highlight">
											<div className="user_info">
												<span>New order placed..</span>
												<p>10 Aug 2020</p>
											</div>
											<div className="ms-auto">
												<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-primary btn-xs sharp me-1"><i className="fa fa-pencil"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-danger btn-xs sharp"><i className="fa fa-trash"></i></a>
											</div>
										</div>
									</li>
									
									
							
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		{/***********************************
            Chat box End
        ************************************/}


{/**********************************
            Header start
        ************************************/}
        <div className="header">
            <div className="header-content">
                <nav className="navbar navbar-expand">
                    <div className="collapse navbar-collapse justify-content-between">
                        <div className="header-left">
                            <div className="dashboard_bar">
								Calendar
                            </div>
                        </div>
                        <ul className="navbar-nav header-right">
							<li className="nav-item">
								<div className="input-group search-area d-lg-inline-flex d-none">
									<div className="input-group-append">
										<span className="input-group-text"><a href="#" onClick={(e) => e.preventDefault()}><i className="flaticon-381-search-2"></i></a></span>
									</div>
									<input type="text" className="form-control" placeholder="Search here..."/>
								</div>
							</li>
							<li className="nav-item dropdown notification_dropdown">
                                <a className="nav-link bell bell-link" href="#" onClick={(e) => e.preventDefault()}>
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M2.23779 10.2492L4.66679 11.7064V8.30554L2.23779 10.2492Z" fill="#67636D"/>
										<path d="M1.1665 12.327V23.3334C1.16852 23.8531 1.28817 24.3656 1.5165 24.8325L9.20134 17.15L1.1665 12.327Z" fill="#67636D"/>
										<path d="M26.4832 24.8325C26.7115 24.3656 26.8311 23.8531 26.8332 23.3334V12.327L18.7983 17.15L26.4832 24.8325Z" fill="#67636D"/>
										<path d="M23.3335 8.30554V11.7064L25.7625 10.2492L23.3335 8.30554Z" fill="#67636D"/>
										<path d="M21.0492 13.0772C21.024 12.998 21.0076 12.9162 21.0002 12.8334V7.00004C21.0002 6.69062 20.8773 6.39388 20.6585 6.17508C20.4397 5.95629 20.1429 5.83337 19.8335 5.83337H8.16684C7.85742 5.83337 7.56067 5.95629 7.34188 6.17508C7.12309 6.39388 7.00017 6.69062 7.00017 7.00004V12.8334C6.99274 12.9162 6.97631 12.998 6.95117 13.0772L14.0002 17.3064L21.0492 13.0772Z" fill="#67636D"/>
										<path d="M17.3262 3.50003L14.7292 1.4222C14.5222 1.25653 14.2651 1.16626 14 1.16626C13.7349 1.16626 13.4777 1.25653 13.2708 1.4222L10.6738 3.50003H17.3262Z" fill="#67636D"/>
										<path d="M16.7358 18.3855L14.6008 19.6688C14.4194 19.7778 14.2117 19.8354 14 19.8354C13.7883 19.8354 13.5806 19.7778 13.3991 19.6688L11.2641 18.3855L3.16748 26.4833C3.63438 26.7117 4.14691 26.8313 4.66665 26.8333H23.3333C23.853 26.8313 24.3656 26.7117 24.8325 26.4833L16.7358 18.3855Z" fill="#67636D"/>
									</svg>
									<span className="badge badge-primary rounded-circle">6</span>
                                </a>
							</li>
							<li className="nav-item dropdown notification_dropdown">
                                <a className="nav-link  ai-icon" href="#" onClick={(e) => e.preventDefault()} role="button" data-bs-toggle="dropdown">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M23.3333 19.8333H23.1187C23.2568 19.4597 23.3295 19.065 23.3333 18.6666V12.8333C23.3294 10.7663 22.6402 8.75902 21.3735 7.12565C20.1068 5.49228 18.3343 4.32508 16.3333 3.80679V3.49996C16.3333 2.88112 16.0875 2.28763 15.6499 1.85004C15.2123 1.41246 14.6188 1.16663 14 1.16663C13.3812 1.16663 12.7877 1.41246 12.3501 1.85004C11.9125 2.28763 11.6667 2.88112 11.6667 3.49996V3.80679C9.66574 4.32508 7.89317 5.49228 6.6265 7.12565C5.35983 8.75902 4.67058 10.7663 4.66667 12.8333V18.6666C4.67053 19.065 4.74316 19.4597 4.88133 19.8333H4.66667C4.35725 19.8333 4.0605 19.9562 3.84171 20.175C3.62292 20.3938 3.5 20.6905 3.5 21C3.5 21.3094 3.62292 21.6061 3.84171 21.8249C4.0605 22.0437 4.35725 22.1666 4.66667 22.1666H23.3333C23.6428 22.1666 23.9395 22.0437 24.1583 21.8249C24.3771 21.6061 24.5 21.3094 24.5 21C24.5 20.6905 24.3771 20.3938 24.1583 20.175C23.9395 19.9562 23.6428 19.8333 23.3333 19.8333Z" fill="#67636D"/>
										<path d="M9.98193 24.5C10.3863 25.2088 10.971 25.7981 11.6767 26.2079C12.3823 26.6178 13.1839 26.8337 13.9999 26.8337C14.816 26.8337 15.6175 26.6178 16.3232 26.2079C17.0289 25.7981 17.6136 25.2088 18.0179 24.5H9.98193Z" fill="#67636D"/>
									</svg>
									<span className="badge badge-primary rounded-circle">4</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <div id="dlab_W_Notification1" className="widget-media dlab-scroll p-3 height380">
										
									</div>
                                    <a className="all-notification" href="#" onClick={(e) => e.preventDefault()}>See all notifications <i className="ti-arrow-right"></i></a>
                                </div>
                            </li>
                            <li className="nav-item dropdown header-profile">
                                <a className="nav-link" href="#" onClick={(e) => e.preventDefault()} role="button" data-bs-toggle="dropdown">
                                    <img src="images/profile/17.jpg" width="20" alt=""/>
									<div className="header-info">
										<span className="text-black">Peter Parkur</span>
										<p className="fs-12 mb-0">Super Admin</p>
									</div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a href="./app-profile.html" className="dropdown-item ai-icon">
                                        <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        <span className="ms-2">Profile </span>
                                    </a>
                                    <a href="./email-inbox.html" className="dropdown-item ai-icon">
                                        <svg id="icon-inbox" xmlns="http://www.w3.org/2000/svg" className="text-success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        <span className="ms-2">Inbox </span>
                                    </a>
                                    <a href="./page-login.html" className="dropdown-item ai-icon">
                                        <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                        <span className="ms-2">Logout </span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
        {/**********************************
            Header end ti-comment-alt
        ************************************/}
      {/**********************************
            Sidebar start
      ***********************************/}
          <div className="dlabnav">
            <div className="dlabnav-scroll">
				
				<a className="add-menu-sidebar" href="#" onClick={(e) => e.preventDefault()}  data-bs-toggle="modal" data-bs-target="#addOrderModalside" >+ New Project</a>
				
			</div>
        </div>
        {/**********************************
            Sidebar end
    ***********************************/}

{/**********************************
            Content body start
  ***********************************/}
        <div className="content-body">
            
			<div className="container-fluid">
				
				<div className="modal fade" id="addOrderModalside">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Create Project</h5>
								<button type="button" className="close" data-bs-dismiss="modal"><span>&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<div className="form-group">
										<label className="text-black font-w500">Project Name</label>
										<input type="text" className="form-control"/>
									</div>
									<div className="form-group">
										<label className="text-black font-w500">Deadline</label>
										<input type="date" className="form-control"/>
									</div>
									<div className="form-group">
										<label className="text-black font-w500">Client Name</label>
										<input type="text" className="form-control"/>
									</div>
									<div className="form-group">
										<button type="button" className="btn btn-primary">CREATE</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-9 col-xxl-8">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-body">
										<div id="calendar" className="app-fullcalendar dashboard-calendar"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-xxl-4">
						<div className="row">
							<div className="col-xl-12">
								<div className="card bg-primary">
									<div className="card-body">
										<div className="date-bx d-flex align-items-center">
											<h2 className="mb-0 me-3">26</h2>
											<div>
												<p className="mb-0 text-white op7">Today</p>
												<span className="fs-24 text-white font-w600">Sunday</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-12">
								<div className="card">
									<div className="card-header border-0 shadow-sm">
										<h4 className="fs-20 text-black font-w600">Project Today</h4>
									</div>
									<div className="card-body">
										<div className="media pb-3 mb-3 border-bottom">
											<span className="p-3 me-3 border border-primary rounded-circle">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M22.9479 9.32202C22.8893 9.14733 22.7836 8.99223 22.6424 8.87382C22.5013 8.75541 22.3301 8.67831 22.1479 8.65102L15.7659 7.67602L12.9019 1.57602C12.8211 1.40423 12.6931 1.25896 12.5329 1.15722C12.3726 1.05547 12.1867 1.00143 11.9969 1.00143C11.8071 1.00143 11.6212 1.05547 11.4609 1.15722C11.3006 1.25896 11.1726 1.40423 11.0919 1.57602L8.22789 7.67602L1.84589 8.65102C1.66411 8.67873 1.49349 8.75602 1.35279 8.8744C1.21209 8.99278 1.10675 9.14767 1.04835 9.32203C0.989954 9.49639 0.980764 9.68347 1.02179 9.86272C1.06282 10.042 1.15247 10.2064 1.28089 10.338L5.93189 15.1L4.83189 21.838C4.80187 22.0229 4.8244 22.2126 4.89691 22.3853C4.96942 22.558 5.08899 22.7069 5.242 22.815C5.39502 22.9231 5.57531 22.986 5.76235 22.9967C5.94939 23.0073 6.13564 22.9651 6.29989 22.875L11.9999 19.727L17.6999 22.875C17.8641 22.9659 18.0506 23.0087 18.2381 22.9985C18.4255 22.9883 18.6063 22.9256 18.7597 22.8176C18.9132 22.7095 19.0331 22.5604 19.1059 22.3873C19.1786 22.2143 19.2011 22.0243 19.1709 21.839L18.0709 15.101L22.7189 10.338C22.8467 10.2061 22.9357 10.0414 22.9761 9.86219C23.0165 9.68296 23.0067 9.49607 22.9479 9.32202Z" fill="#2953E8"/>
												</svg>
											</span>
											<div className="media-body">
												<p className="fs-14 mb-2">09:30 AM - 11:00 AM</p>
												<h6 className="fs-16 font-w600"><a href="projects.html" className="text-black">Convert Apps to mobile version</a></h6>
												<ul className="users">
													<li><img src="images/users/9.jpg" alt=""/></li>
													<li><img src="images/users/10.jpg" alt=""/></li>
													<li><img src="images/users/11.jpg" alt=""/></li>
												</ul>
											</div>
										</div>
										
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
            </div>
        </div>
        {/**********************************
            Content body end
        ***********************************/}
        <div className="footer">
              <div className="copyright">
                  <p>Copyright © Designed &amp; Developed by SevenEight 2024</p>
              </div>
          </div>




      </div>
    </div>
  );
}

export default Calendar;
