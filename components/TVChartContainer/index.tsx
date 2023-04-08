import {
  ChartingLibraryWidgetOptions,
  LanguageCode,
  ResolutionString,
  widget,
} from "@/public/static/charting_library";
import DataFeed from "@/services/binance/datafeed";
import { useEffect, useRef } from "react";
import styles from "./index.module.css";
import DefinedDataFeed from "@/services/defined/datafeed";

export const TVChartContainer = (
  props: Partial<ChartingLibraryWidgetOptions>
) => {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: props.symbol,
      theme: props.theme,
      datafeed: new DefinedDataFeed({}),
      timezone: props.timezone,
      interval: props.interval as ResolutionString,
      container: chartContainerRef.current,
      library_path: props.library_path,
      custom_css_url: 'https://assets.staticimg.com/trade-web/4.2.28/charting_library_24/custom.css',
      locale: props.locale as LanguageCode,
      disabled_features: ["use_localstorage_for_settings", "popup_hints", "study_templates", "header_symbol_search", "header_compare"],
      enabled_features: ["study_templates"],
      charts_storage_url: props.charts_storage_url,
      charts_storage_api_version: props.charts_storage_api_version,
      save_load_adapter: props.save_load_adapter,
      client_id: props.client_id,
      user_id: props.user_id,
      fullscreen: props.fullscreen,
      autosize: props.autosize,
      overrides: {
        "paneProperties.backgroundType": "solid",
        "paneProperties.background": "#000",
      },
      loading_screen: {
        backgroundColor: "#000",
        foregroundColor: "#000"
      }
      // overrides: {
      //   "mainSeriesProperties.priceAxisProperties.log": false,
      // },
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          })
        );

        button.innerHTML = "Check API";

        const priceScale = tvWidget
          .activeChart()
          .getPanes()[0]
          .getRightPriceScales()[0];
        priceScale.setMode(1);

        // tvWidget.subscribe("onPlusClick", (params) => {
        //   // TODO: Add custom logic here
        //   tvWidget
        //     .activeChart()
        //     .createShape(
        //       { price: params.price, time: Date.now() },
        //       { shape: "horizontal_line" }
        //     );
        // });

        tvWidget.subscribe("onAutoSaveNeeded", () =>
          tvWidget.saveChartToServer(undefined, undefined, {
            chartName: "tv-chart-default",
          })
        );
      });
    });

    return () => {
      tvWidget.remove();
    };
  }, [props]);

  return (
    <>
      <div ref={chartContainerRef} className={styles.TVChartContainer} />
    </>
  );
};
