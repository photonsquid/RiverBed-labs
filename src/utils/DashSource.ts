import dashjs, { BitrateInfo, StreamInfo } from "dashjs";

export type XmlTagAttributes = {
  [key: string]: string;
}

/**
 * @brief A source for the DASH component
 */
export default class DashSource {
  private url: string;
  private player: dashjs.MediaPlayerClass;
  private initialized: boolean;

  constructor(url: string) {
    this.url = url;
    this.player = dashjs.MediaPlayer().create();
    this.initialized = false;
  }

  /**
   * @brief get url of the player
   * @returns url as string
   */
  public getURL(): string {
    return this.url;
  }

  /**
   * @brief get player instance
   * @returns instance of dashjs.MediaPlayerClass
   */
  public getPlayer(): dashjs.MediaPlayerClass {
    return this.player;
  }

  /**
   * @brief set new url to player
   * @param url new url
   */
  public setURL(url: string): void {
    this.url = url;
    // set new url to player
    this.player.attachSource(url);

  }

  /**
   * @brief initialize player
   * @param selector selector of the video element
   * @param callBack callback function
   */
  public initialize(selector: string, callBack?: Function): void {
    const view = document.querySelector(selector) as HTMLVideoElement;
    if (view) {
      view && this.player.initialize(view, this.url, true);
      view.muted = true;
      this.player.updateSettings({
        'streaming': {
          'abr': {
            'autoSwitchBitrate': {
              'video': false,
              'audio': false
            }
          }
        }
      });
      this.player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
        callBack && callBack();
        this.initialized = true;
      }
      );
    }
  }

  /**
   * @brief check if player is initialized
   * @returns true if player is initialized
   */
  public isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * @brief reset dash source initialization
   * @returns void
   */
  public reset(): void {
    this.initialized = false;
    this.player.reset();
  }
  
  /**
   * @brief download manifest as string
   * @returns manifest as string
   */
  public async getManifest(): Promise<string> {
    const response = await fetch(this.url);
    const manifest = await response.text();
    return manifest;
  }

  public async getQualityFor(type: 'video' | 'audio' | 'image'): Promise<number> {
    return this.player.getQualityFor(type);
  }

  /**
   * @brief set quality for video, audio or image
   * @param type media type
   * @param quality index of the representation
   */
  public async setQualityFor(type: 'video' | 'audio' | 'image', quality: number): Promise<void> {
    this.player.setQualityFor(type, quality, true);
  }

  /**
   * @brief get all streams from manifest
   * @return StreamInfo[]
   */
  public async getStreamsFromManifest(): Promise<StreamInfo[]> {
    return this.player.getStreamsFromManifest(await this.getManifest() as any)
      .map((stream: StreamInfo) => {
        console.log(stream);
        return stream;
      });
  }

  /**
   * @brief get all bitrate info for a media type
   * @param type media type
   * @returns BitrateInfo[]
   */
  public async getBitrateInfoListFor(type: 'video' | 'audio' | 'image'): Promise<BitrateInfo[]> {
    return this.player.getBitrateInfoListFor(type);
  }

  public setAutoSwitchBitrateFor(type: 'video' | 'audio' | 'image', value: boolean): void {
    this.player.updateSettings({
      'streaming': {
        'abr': {
          'autoSwitchBitrate': {
            [type]: value
          }
        }
      }
    });
  }



}