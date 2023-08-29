function ShopPageSidebar() {
  return (
    <aside className="sidebar shop-sidebar sticky-sidebar-wrapper sidebar-fixed">
      {/* <!-- Start of Sidebar Overlay --> */}
      <div className="sidebar-overlay"></div>
      <a className="sidebar-close" href="#">
        <i className="close-icon"></i>
      </a>

      {/* <!-- Start of Sidebar Content --> */}
      <div className="sidebar-content scrollable">
        {/* <!-- Start of Sticky Sidebar --> */}
        <div className="sticky-sidebar">
          <div className="filter-actions">
            <label>Filter :</label>
            <a href="#" className="btn btn-dark btn-link filter-clean">
              Clean All
            </a>
          </div>
          {/* <!-- Start of Search Widget --> */}
          <div className="widget widget-collapsible">
            <h3 className="widget-title">
              <span>Search</span>
            </h3>
            <div className="widget-body">
              <form className="price-range">
                <input
                  type="text"
                  name="min_price"
                  className="min_price text-center"
                  style={{ width: "100%" }}
                />
                <a href="#" className="btn btn-primary btn-rounded">
                  <i className="w-icon-search" />
                </a>
              </form>
            </div>
          </div>
          {/* <!-- End of Search Widget --> */}
          {/* <!-- Start of Collapsible widget --> */}
          <div className="widget widget-collapsible">
            <h3 className="widget-title">
              <span>All Categories</span>
            </h3>
            <ul className="widget-body filter-items search-ul">
              <li>
                <a href="#">Accessories</a>
              </li>
              <li>
                <a href="#">Accessories</a>
              </li>
              <li>
                <a href="#">Accessories</a>
              </li>
            </ul>
          </div>
          {/* <!-- End of Collapsible Widget --> */}

          {/* <!-- Start of Collapsible Widget --> */}
          <div className="widget widget-collapsible">
            <h3 className="widget-title">
              <span>Price</span>
            </h3>
            <div className="widget-body">
              <form className="price-range">
                <input
                  type="number"
                  name="min_price"
                  className="min_price text-center"
                  placeholder="$min"
                />
                <span className="delimiter">-</span>
                <input
                  type="number"
                  name="max_price"
                  className="max_price text-center"
                  placeholder="$max"
                />
                <a href="#" className="btn btn-primary btn-rounded">
                  Go
                </a>
              </form>
            </div>
          </div>
          {/* <!-- End of Collapsible Widget --> */}
          {/* <!-- Start of Collapsible widget --> */}
          <div className="widget widget-collapsible">
            <h3 className="widget-title">
              <span>All Tags</span>
            </h3>
            <ul
              className="widget-body filter-items search-ul"
              style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
            >
              <li>
                <a
                  href="#"
                  style={{ border: "1px solid #ddd", padding: "5px" }}
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>
          {/* <!-- End of Collapsible Widget --> */}

          {/* <!-- Start of Collapsible Widget --> */}
          {/* <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                      <span>Size</span>
                    </h3>
                    <ul className="widget-body filter-items item-check mt-1">
                      <li>
                        <a href="#">Extra Large</a>
                      </li>
                      <li>
                        <a href="#">Large</a>
                      </li>
                      <li>
                        <a href="#">Medium</a>
                      </li>
                      <li>
                        <a href="#">Small</a>
                      </li>
                    </ul>
                  </div> */}
          {/* <!-- End of Collapsible Widget --> */}

          {/* <!-- Start of Collapsible Widget --> */}
          {/* <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                      <span>Brand</span>
                    </h3>
                    <ul className="widget-body filter-items item-check mt-1">
                      <li>
                        <a href="#">Elegant Auto Group</a>
                      </li>
                      <li>
                        <a href="#">Green Grass</a>
                      </li>
                      <li>
                        <a href="#">Node Js</a>
                      </li>
                      <li>
                        <a href="#">NS8</a>
                      </li>
                      <li>
                        <a href="#">Red</a>
                      </li>
                      <li>
                        <a href="#">Skysuite Tech</a>
                      </li>
                      <li>
                        <a href="#">Sterling</a>
                      </li>
                    </ul>
                  </div> */}
          {/* <!-- End of Collapsible Widget --> */}

          {/* <!-- Start of Collapsible Widget --> */}
          {/* <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                      <span>Color</span>
                    </h3>
                    <ul className="widget-body filter-items item-check mt-1">
                      <li>
                        <a href="#">Black</a>
                      </li>
                      <li>
                        <a href="#">Blue</a>
                      </li>
                      <li>
                        <a href="#">Brown</a>
                      </li>
                      <li>
                        <a href="#">Green</a>
                      </li>
                      <li>
                        <a href="#">Grey</a>
                      </li>
                      <li>
                        <a href="#">Orange</a>
                      </li>
                      <li>
                        <a href="#">Yellow</a>
                      </li>
                    </ul>
                  </div> */}
          {/* <!-- End of Collapsible Widget --> */}
        </div>
        {/* <!-- End of Sidebar Content --> */}
      </div>
      {/* <!-- End of Sidebar Content --> */}
    </aside>
  );
}

export default ShopPageSidebar;
