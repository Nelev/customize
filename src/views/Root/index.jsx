import { connect } from "react-redux";
import { Divider, Row, Col } from "antd";
import React from "react";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { history } from "react-router-prop-types";

import { fetchCarouselImages } from "./actions";
import Header from "../../components/Header";
import { statePropType } from "./reducer";
import MainCarousel from "../../components/MainCarousel";

import "./style.css";
import MainSidePanel from "../../components/MainSidePanel";

class Root extends React.Component {
    static propTypes = {
        ...statePropType,
        fetchCarouselImages: PropTypes.func.isRequired,
        history: history.isRequired
    };

    componentDidMount() {
        const { fetchCarouselImages } = this.props;
        fetchCarouselImages();
    }

    render() {
        const { carouselImages, isFetchingCarouselImages } = this.props;
        return (
            <div>
                <Row gutter={16}>
                    <Col span={4} />
                    <div className="v-Main">
                        <Col span={16}>
                            <Header />
                            <Divider />
                            <div>
                                <b>Check out our last works!</b>
                            </div>
                            <Col span={10}>
                                <MainCarousel
                                    carouselImages={carouselImages}
                                    isFetchingCarouselImages={
                                        isFetchingCarouselImages
                                    }
                                />
                            </Col>
                            <Col span={6}>
                                <div>
                                    Press <b>Create Button</b> and get started!
                                </div>
                                <Col />
                                <MainSidePanel />
                            </Col>
                        </Col>
                    </div>
                    <Col span={4} />
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        carouselImages: state.views.root.carouselImages,
        isFetchingCarouselImages: state.views.root.isFetchingCarouselImages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCarouselImages: bindActionCreators(fetchCarouselImages, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);
